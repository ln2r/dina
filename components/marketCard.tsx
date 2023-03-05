import { Card } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

interface MarketCardComponentProps {
  title: string;
  basePrice: number;
  lastSold: number;
  maxSize?: number;
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColors: string;
      backgroundColors: string;
    }[]
  }
}

export const MarketCardComponent: React.FC<MarketCardComponentProps> = ({ title, basePrice, lastSold, chartData, maxSize }) => {
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
    <Card style={maxSize ? { width: `${maxSize}rem`} : {}}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>{lastSold} Silver</Card.Subtitle>
        <Line options={options} data={chartData} />
      </Card.Body>
    </Card>
  )
}