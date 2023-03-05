import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import Head from 'next/head'
import { Container, Row, Col, Form, Modal, Table, Spinner } from 'react-bootstrap'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react'
import { getMarket } from '../utils/getMarket'
import { getMarketHistorical } from '../utils/getMarketHistorical'
import { debounce } from 'lodash'
import axios from 'axios'
import { NavbarComponent } from '../components/navbar'
import { MarketCardComponent } from '../components/marketCard'

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

  type MarketData = {
    name: string;
    basePrice: number;
    totalTrades: number;
    priceMin: number;
    priceMax: number;
    lastSoldPrice: number;
  };
  
  type HistoricalData = {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  };
  
  type ItemModalData = {
    market?: MarketData;
    historical?: HistoricalData;
  };

  const getMarketData = async (id: number) => {
    const response = await fetch(`/api/market?region=na&id=${id}`);
    const data = await response.json();
    return data;
  };

  const getHistoricalData = async (id: number) => {
    const response = await fetch(`/api/market/history?region=na&id=${id}&sid=0`);
    const data = await response.json();
    return data;
  };

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [itemModal, setItemModal] = useState<ItemModalData>({});
  
  const handleClose = () => setShow(false);

  const handleShow = async (id: number) => {
    setShow(true);
    setLoading(true);

    try {
      const marketData = await getMarketData(id);
      const historicalData = await getHistoricalData(id);

      console.log(marketData);

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
  const [savedDataPrimary, setSavedDataPrimary] = useState<any>([]);
  const [savedDataSecondary, setSavedDataSecondary] = useState<any>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any>([]);

  const savedItemsPrimary = [
    { id: 4658, sid: 0 },
    { id: 5802, sid: 0 },
  ];

  const savedItemsSecondary = [
    { id: 4401, sid: 0 },
    { id: 5856, sid: 0 },
    { id: 4657, sid: 0 },
  ]

  const searchItems = debounce(async (event) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);

    try {
      if (inputValue !== '') {
        const response = await axios.get(`/api/items?name=${inputValue}&limit=15`);

        setSearchResults(response.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error(error);
    }
  }, 500);

  useEffect(() => {
    async function getAPIData() {
      const responsePrimary:any[] = [];
      const responseSecondary:any[] = [];
      for (const ids of savedItemsPrimary) {
        responsePrimary.push({
          historical: await getMarketHistorical(`/api/market/history?region=na&id=${ids.id}&sid=${ids.sid}`),
          market: await (await getMarket(`/api/market?region=na&id=${ids.id}`))[0],
        })
      }

      for (const ids of savedItemsSecondary) {
        responseSecondary.push({
          historical: await getMarketHistorical(`/api/market/history?region=na&id=${ids.id}&sid=${ids.sid}`),
          market: await (await getMarket(`/api/market?region=na&id=${ids.id}`))[0],
        })
      }

      setSavedDataPrimary(responsePrimary);
      setSavedDataSecondary(responseSecondary);
    }

    getAPIData();
  }, []);

  return (
    <div>
      <Head>
        <title>Dina - A BDO Dashboard</title>
        <meta name='description' content='Simple Black Desert Online tracker' />
      </Head>

      <main>
        <NavbarComponent pageLocation='home' />
        <Container className='p-4' fluid='true'>
          <Row>
            <Col xl={9}>
              <Row>
                {savedDataPrimary.map((data:any) => {
                  return (
                    <Col key={`market-card-${data.market.id}`}>
                      <MarketCardComponent title={data.market.name} basePrice={data.market.basePrice} lastSold={data.market.lastSoldPrice} chartData={data.historical}/>
                    </Col>
                  )
                })}
              </Row>
              <Row className='pt-3'>
                {savedDataSecondary.map((data:any) => {
                  return (
                    <Col key={`market-card-${data.market.id}`}>
                      <MarketCardComponent title={data.market.name} basePrice={data.market.basePrice} lastSold={data.market.lastSoldPrice} chartData={data.historical}/>
                    </Col>
                  )
                })}
              </Row>
            </Col>
            <Col className='border-start' fluid>
              <Row>
                <Form>
                  <Form.Control
                    type='search'
                    placeholder='Search for an item...'
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
                          <td className='ps-3'><a onClick={() => handleShow(result.id)}><FontAwesomeIcon icon={faStarRegular} size='sm' /> {new DOMParser().parseFromString(result.name, 'text/html').body.textContent}</a></td>
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
                  <>
                    <FontAwesomeIcon icon={itemModal.market.name ? faStarRegular : faCircleXmark} size='sm' /> {itemModal.market.name ? itemModal.market.name : 'Can\'t get Item Data'}
                  </>
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
                      <span className='fw-semibold'>Last Sold (1623625787)</span> {itemModal?.market?.lastSoldPrice}
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
