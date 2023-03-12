import { faChevronDown, faChevronUp, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { Col, Row, Table } from 'react-bootstrap';
import { ArsaMarketItemData } from '../pages/api/types/items';

type HistoricalData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
};

type SavedItemData = {
  market?: ArsaMarketItemData;
  historical?: HistoricalData;
};
interface MarketCardComponentProps {
  data: SavedItemData[];
}

const arsaImageCDN = ({ src }: { src: string }) => {
  return `https://${src}`;
}

const getPriceAverage = (historicalData: number[]) => {
  if (historicalData.length === 0) {
    return <h1 className='text-muted'><FontAwesomeIcon icon={faMinus} /> N/A</h1>
  }

  const sum = historicalData.reduce((acc, cur) => +acc + +cur, 0);
  const avg = sum / historicalData.length;
  const latest = historicalData[historicalData.length - 1];
  const diff = latest - avg;
  const percentageTrend = (diff / avg) * 100;

  return percentageTrend === 0 
    ?
      <h1 className='text-success'><FontAwesomeIcon icon={faMinus} /> {percentageTrend.toLocaleString('en-US', {minimumIntegerDigits: 3, minimumFractionDigits: 2, maximumFractionDigits: 2})}%</h1>
    :
      percentageTrend < 0
      ?
        <h1 className='text-success'><FontAwesomeIcon icon={faChevronDown} /> {percentageTrend.toLocaleString('en-US', {minimumIntegerDigits: 3, minimumFractionDigits: 2, maximumFractionDigits: 2})}%</h1>
      :
        <h1 className='text-danger'><FontAwesomeIcon icon={faChevronUp} /> {percentageTrend.toLocaleString('en-US', {minimumIntegerDigits: 3, minimumFractionDigits: 2, maximumFractionDigits: 2})}%</h1>
    ;
}

export const MarketCardComponent: React.FC<MarketCardComponentProps> = ({ data }) => {
  console.log(data);
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

  return (
    <Table className='market-card'>
      <tbody>
       {data && data.map((item) => {
        return (
          <tr key={`saved-market-item-${item.market?.id}`}>
            <td>
              <Row>
                <Col style={{ maxWidth: '50px' }}>
                  <Image 
                    loader={arsaImageCDN}
                    src={item.market?.icon ?? ''}
                    alt={`icon for ${item.market?.name}`}
                    height={50}
                    width={50}
                    layout='fixed'
                  />
                </Col>
                <Col className='ps-4'>               
                  <Row>
                    <h1 className='m-0'><span className='text-muted'>{item.market?.id}</span> {item.market?.name}</h1>
                  </Row>
                  <Row>
                    <p className='m-0 text-muted'>Last Sold ({new Date((item.market?.lastSoldTime ?? 0) * 1000).toLocaleString()}): {item.market?.lastSoldPrice.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0})} Silver</p>
                  </Row>
                </Col>
                <Col className='text-end'>
                  <h1>{getPriceAverage(item.historical?.datasets[0].data ?? [])}</h1>
                </Col>
              </Row>
            </td>
          </tr>
        )
       })}
      </tbody>
    </Table>
  )
}