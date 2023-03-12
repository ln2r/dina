import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faStar} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import Head from 'next/head'
import { Container, Row, Col, Form, Modal, Table, Spinner } from 'react-bootstrap'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react'
import { getMarketData } from '../utils/getMarket'
import { getHistoricalData } from '../utils/getMarketHistorical'
import { debounce } from 'lodash'
import axios from 'axios'
import { NavbarComponent } from '../components/navbar'
import { MarketCardComponent } from '../components/marketCard'
import { ArsaMarketItemData } from './api/types/items'

export default function Home() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };
  
  type HistoricalData = {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  };

  type ItemModalMarketData = ArsaMarketItemData & {
    saved: boolean;
  }
  
  type ItemModalData = {
    market?: ItemModalMarketData;
    historical?: HistoricalData;
  };

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savedLoading, setSavedLoading] = useState(false);
  const [itemModal, setItemModal] = useState<ItemModalData>({});
  
  const [bookmarkedItems, setBookmarkedItems] = useState<any>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any>([]);
  
  const handleClose = () => setShow(false);
  const handleShow = async (id: number) => {
    setShow(true);
    setLoading(true);

    try {
      const marketData = await getMarketData(id);
      const historicalData = await getHistoricalData(id);

      // marking the saved items
      const saved = JSON.parse(localStorage.getItem('items') as string);
      if (saved && marketData) {
        marketData[0].saved = saved.find((savedItem:any) => savedItem.id === marketData[0].id) ? true : false;
      }

      setItemModal({
        market: marketData[0],
        historical: historicalData,
      });

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const searchItems = debounce(async (event) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);

    try {
      if (inputValue !== '') {
        const response = await axios.get(`/api/items?name=${inputValue}&limit=15`);

        // marking the saved items
        const saved = JSON.parse(localStorage.getItem('items') as string);
        if (saved) {
          response.data.map((item:any) => {
            item.saved = saved.find((savedItem:any) => savedItem.id === item.id) ? true : false;
          })
        }

        setSearchResults(response.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error(error);
    }
  }, 500);

  const addToLocalStorage = (itemId: number | undefined, itemSid: number = 0) => {
    if (!itemId) {
      return;
    }

    const savedList = JSON.parse(localStorage.getItem('items') as string);
    let updatedList:any[] = [];
    
    // check if its already saved
    const saved = savedList?.find((item:any) => item.id === itemId && item.sid === itemSid);
    if (saved && savedList) {
      updatedList = savedList?.filter((item:any) => item.id !== itemId && item.sid !== itemSid);
    } else {
      updatedList = [
        ...savedList ?? [],
        {
          id: itemId,
          sid: itemSid,
        },
      ];
    }

    localStorage.setItem('items', JSON.stringify(updatedList));
  }

  useEffect(() => {
    setSavedLoading(true);

    async function getAPIData() {
      const savedList = JSON.parse(localStorage.getItem('items') as string);
      if (savedList) {
        const apiResponse = [];
  
        for (const savedItem of savedList) {  
          console.log(savedItem)
          apiResponse.push({
            historical: await getHistoricalData(savedItem.id, savedItem.sid),
            market: (await getMarketData(savedItem.id))[0],
          });
        }
  
        setBookmarkedItems(apiResponse);
        setSavedLoading(false);
      }
    }
  
    getAPIData();
  }, []);  

  return (
    <div>
      <Head>
        <title>Dina - A BDO Dashboard</title>
        <meta name='description' content='Simple Black Desert Online tracker' />
        <meta name='author' content='ln2r' />
      </Head>

      <main>
        <NavbarComponent pageLocation='home' />
        <Container className='p-4' fluid={true}>
          <Row>
            <Col md={9} style={{ height: '85vh' }}>
              <MarketCardComponent data={bookmarkedItems} />
            </Col>
            <Col className='border-start' md={3} style={{ height: '85vh' }}>
              <Row>
                <Form>
                  <Form.Control
                    type='search'
                    placeholder='Search for items...'
                    className='me-2'
                    aria-label='Search'
                    onChange={searchItems}
                  />
                </Form>
              </Row>
              <Row>
                <Table className='search-result'>
                  <tbody>
                    { searchResults.map((result:any) => {
                      return (
                        <tr key={`search-result-${result.id}`}>
                          <td className='ps-3'><a onClick={() => handleShow(result.id)}><FontAwesomeIcon icon={result.saved ? faStar : faStarRegular } size='sm' /> {new DOMParser().parseFromString(result.name, 'text/html').body.textContent}</a></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Row>
              <Row className='ps-3'>
                <div className='fw-semibold text-primary p-0'>About</div>
                <ul className='fw-light m-0'>
                  <li><a href='https://ln2r.github.io'>Created by ln2r</a></li>
                  <li><a href='https://documenter.getpostman.com/view/4028519/TzK2bEVg'>Used Veliainn - Arsa.io BDO Market API</a>, <a href='https://bdocodex.com/us/'>BDO Codex</a></li>
                </ul>
              </Row>
            </Col>
          </Row>
        </Container>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {loading ? (
              <>
                <Spinner animation='border' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </Spinner>{' '}
                Fetching Data...
              </>
            ) : (
              <>
                {itemModal?.market && (
                  <div onClick={() => addToLocalStorage(itemModal?.market?.id, itemModal?.market?.sid)}>
                    <FontAwesomeIcon icon={itemModal.market.name ? itemModal.market.saved ? faStar : faStarRegular : faCircleXmark} size='sm' /> {itemModal.market.name ? itemModal.market.name : 'Can\'t get Item Data'}
                  </div>
                )}
              </>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <></>
          ) : (
            <>
              {itemModal?.historical && (
                <>
                  <Line options={options} data={itemModal.historical} />
                  <div className='pt-2'>
                    <p>
                      <span className='fw-semibold'>Base Price</span> {itemModal?.market?.basePrice}
                    </p>
                    <p>
                      <span className='fw-semibold'>Total Trades</span> {itemModal?.market?.totalTrades}
                    </p>
                    <p>
                      <span className='fw-semibold'>Prices (Mix - Max)</span> {itemModal?.market?.priceMin} -{' '}
                      {itemModal?.market?.priceMax}
                    </p>
                    <p>
                      <span className='fw-semibold'>Last Sold ({new Date((itemModal?.market?.lastSoldTime ?? 0) * 1000).toLocaleString()})</span> {itemModal?.market?.lastSoldPrice}
                    </p>
                  </div>
                </>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
      </main>
    </div>
  )
}
