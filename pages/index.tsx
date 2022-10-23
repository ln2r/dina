import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faChevronUp, faChevronDown, faFlask, faDrumstickBite} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import Head from 'next/head'
import { Container, Row, Col, ListGroup, Badge, InputGroup, Form, Button, Accordion, Card, Modal } from 'react-bootstrap'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useState } from 'react'

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
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Item Name Here',
      },
    },
  };

  const labels = [new Date(1612035654).toLocaleTimeString(), new Date(1612122054).toLocaleTimeString(), new Date(1612208454).toLocaleTimeString(), new Date(1612294854).toLocaleTimeString(), new Date(1612381254).toLocaleTimeString(), new Date(1612467654).toLocaleTimeString(), new Date(1612554054).toLocaleTimeString(), new Date(1612640454).toLocaleTimeString(), new Date(1612726854).toLocaleTimeString(), new Date(1612813254).toLocaleTimeString()];

  const data = {
    labels,
    datasets: [
      {
        label: 'Price',
        data: [170000, 170000, 170000, 188000, 188000, 225000, 231000, 231000, 231000, 231000],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Head>
        <title>Dina - A BDO Dashboard</title>
        <meta name="description" content="Simple Black Desert Online tracker" />
      </Head>

      <main>
        <Container className='p-0'>
          <Row className='py-4'>
            <Col sm={3} className='sidebar m-0 p-0'>
              <ListGroup as='ol' variant='flush'>
                <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
                  <div className='ms-2 me-auto'>
                    <div className='fw-semibold text-primary'>Dina</div>
                    <span className='fw-light'>A BDO Dashboard</span>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
                  <div className='ms-2 me-auto'>
                    <div className='fw-semibold text-primary'>Central Market</div>
                    <ul className='ps-0 ms-0'>
                      <li><a href='#'>Object Tangled in an Abandoned Net</a></li>
                      <li><a href='#'>Object Tangled in an Abandoned Net</a></li>
                      <li><a href='#'>Object Tangled in an Abandoned Net</a></li>
                      <li><a href='#'>Object Tangled in an Abandoned Net</a></li>
                      <li><a href='#'>Object Tangled in an Abandoned Net</a></li>
                    </ul>
                  </div>
                  <Badge bg='primary' pill>
                    5
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
                  <div className='ms-2 me-auto'>
                    <div className='fw-semibold text-primary'>Carfting Recipes</div>
                    <ul className='ps-0 ms-0'>
                      <li><a href='#'>Object Tangled in an Abandoned Net</a></li>
                      <li><a href='#'>Object Tangled in an Abandoned Net</a></li>
                      <li><a href='#'>Object Tangled in an Abandoned Net</a></li>
                      <li><a href='#'>Object Tangled in an Abandoned Net</a></li>
                      <li><a href='#'>Object Tangled in an Abandoned Net</a></li>
                    </ul>
                  </div>
                  <Badge bg='primary' pill>
                    5
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
                  <div className='ms-2 me-auto'>
                    <div className='fw-semibold text-primary'>Items</div>
                    <ul className='ps-0 ms-0'>
                      <li><a href='#'>Object Tangled in an Abandoned Net</a></li>
                      <li><a href='#'>Object Tangled in an Abandoned Net</a></li>
                      <li><a href='#'>Object Tangled in an Abandoned Net</a></li>
                      <li><a href='#'>Object Tangled in an Abandoned Net</a></li>
                      <li><a href='#'>Object Tangled in an Abandoned Net</a></li>
                    </ul>
                  </div>
                  <Badge bg='primary' pill>
                    5
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item as='li' className='d-flex justify-content-between align-items-start'>
                  <div className='ms-2 me-auto'>
                    <div className='fw-semibold text-primary'>About</div>
                    <ul className='fw-light ps-0 ms-0'>
                      <li><a href='https://ln2r.github.io'>- Created by ln2r</a></li>
                      <li><a href='https://documenter.getpostman.com/view/4028519/TzK2bEVg'>- Used Veliainn - Arsa.io BDO Market API</a></li>
                      <li><a href='https://bdocodex.com/us/'>- Used BDO Codex</a></li>
                    </ul>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col className='m-0 p-0'>
              <Accordion defaultActiveKey={['0', '1', '2']} flush alwaysOpen className='p-0 m-0'>
                <Accordion.Item eventKey='0' className='market'>
                  <Accordion.Header className='fw-semibold text-primary mb-2'>Central Marketplace</Accordion.Header>
                  <Accordion.Body className='p-2'>
                    <InputGroup>
                      <Form.Control
                        placeholder='Search an item in the central market...'
                        aria-label='Search an item in the central market...'
                        aria-describedby='basic-market'
                      />
                      <Button variant='primary' id='market-button'>
                        Search
                      </Button>
                    </InputGroup>
                    <div className='border-top mt-2'>
                      <div className='fw-semibold text-primary mb-2 ms-3'>Search Results</div>
                      <ul>
                        <li><a onClick={handleShow}><FontAwesomeIcon icon={faStarRegular} size='sm' /> <Badge bg='success'>20% <FontAwesomeIcon icon={faChevronDown} size='sm' /></Badge> PEN: Seleth Longsword</a></li>
                        <li><a onClick={handleShow}><FontAwesomeIcon icon={faStarRegular} size='sm' /> <Badge bg='success'>20% <FontAwesomeIcon icon={faChevronDown} size='sm' /></Badge> PEN: Seleth Longsword</a></li>
                        <li><a onClick={handleShow}><FontAwesomeIcon icon={faStarRegular} size='sm' /> <Badge bg='danger'>20% <FontAwesomeIcon icon={faChevronUp} size='sm' /></Badge> PEN: Seleth Longsword</a></li>
                        <li><a onClick={handleShow}><FontAwesomeIcon icon={faStarRegular} size='sm' /> <Badge bg='danger'>20% <FontAwesomeIcon icon={faChevronUp} size='sm' /></Badge> PEN: Seleth Longsword</a></li>
                        <li><a onClick={handleShow}><FontAwesomeIcon icon={faStarRegular} size='sm' /> <Badge bg='success'>20% <FontAwesomeIcon icon={faChevronDown} size='sm' /></Badge> PEN: Seleth Longsword</a></li>
                      </ul>
                    </div>
                    <div className='border-top mt-2'>
                      <div className='fw-semibold text-primary mb-2 ms-3'>Bookmarked Items</div>
                      <Row>
                        <Col>
                          <Card border='primary' style={{ width:'19rem' }}>
                            <Card.Header>
                              <Line options={options} data={data} />
                            </Card.Header>
                            <Card.Body>
                              <Card.Title className='text-center fw-semibold'>
                                <FontAwesomeIcon icon={faStar} size='sm' /> PEN: Seleth Longsword <Badge bg='primary' pill>1</Badge>
                              </Card.Title>
                            </Card.Body>
                            <Card.Body className='pt-0'>
                              <p><span className='fw-semibold'>Base Price</span> 200000</p>
                              <p><span className='fw-semibold'>Total Trades</span> 311774</p>
                              <p><span className='fw-semibold'>Prices (Mix - Max)</span> 23100 - 231000</p>
                              <p><span className='fw-semibold'>Last Sold (1623625787)</span> 185000</p>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col>
                          <Card border='primary' style={{ width:'19rem' }}>
                            <Card.Header>
                              <Line options={options} data={data} />
                            </Card.Header>
                            <Card.Body>
                              <Card.Title className='text-center fw-semibold'>
                                <FontAwesomeIcon icon={faStar} size='sm' /> PEN: Seleth Longsword <Badge bg='primary' pill>1</Badge>
                              </Card.Title>
                            </Card.Body>
                            <Card.Body className='pt-0'>
                              <p><span className='fw-semibold'>Base Price</span> 200000</p>
                              <p><span className='fw-semibold'>Total Trades</span> 311774</p>
                              <p><span className='fw-semibold'>Prices (Mix - Max)</span> 23100 - 231000</p>
                              <p><span className='fw-semibold'>Last Sold (1623625787)</span> 185000</p>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col>
                          <Card border='primary' style={{ width:'19rem' }}>
                            <Card.Header>
                              <Line options={options} data={data} />
                            </Card.Header>
                            <Card.Body>
                              <Card.Title className='text-center fw-semibold'>
                                <FontAwesomeIcon icon={faStar} size='sm' /> PEN: Seleth Longsword <Badge bg='primary' pill>1</Badge>
                              </Card.Title>
                            </Card.Body>
                            <Card.Body className='pt-0'>
                              <p><span className='fw-semibold'>Base Price</span> 200000</p>
                              <p><span className='fw-semibold'>Total Trades</span> 311774</p>
                              <p><span className='fw-semibold'>Prices (Mix - Max)</span> 23100 - 231000</p>
                              <p><span className='fw-semibold'>Last Sold (1623625787)</span> 185000</p>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                      <Row className='mt-2'>
                        <Col>
                          <Card border='primary' style={{ width:'19rem' }}>
                            <Card.Header>
                              <Line options={options} data={data} />
                            </Card.Header>
                            <Card.Body>
                              <Card.Title className='text-center fw-semibold'>
                                <FontAwesomeIcon icon={faStar} size='sm' /> PEN: Seleth Longsword <Badge bg='primary' pill>1</Badge>
                              </Card.Title>
                            </Card.Body>
                            <Card.Body className='pt-0'>
                              <p><span className='fw-semibold'>Base Price</span> 200000</p>
                              <p><span className='fw-semibold'>Total Trades</span> 311774</p>
                              <p><span className='fw-semibold'>Prices (Mix - Max)</span> 23100 - 231000</p>
                              <p><span className='fw-semibold'>Last Sold (1623625787)</span> 185000</p>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col>
                          <Card border='primary' style={{ width:'19rem' }}>
                            <Card.Header>
                              <Line options={options} data={data} />
                            </Card.Header>
                            <Card.Body>
                              <Card.Title className='text-center fw-semibold'>
                                <FontAwesomeIcon icon={faStar} size='sm' /> PEN: Seleth Longsword <Badge bg='primary' pill>1</Badge>
                              </Card.Title>
                            </Card.Body>
                            <Card.Body className='pt-0'>
                              <p><span className='fw-semibold'>Base Price</span> 200000</p>
                              <p><span className='fw-semibold'>Total Trades</span> 311774</p>
                              <p><span className='fw-semibold'>Prices (Mix - Max)</span> 23100 - 231000</p>
                              <p><span className='fw-semibold'>Last Sold (1623625787)</span> 185000</p>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col>
                          <Card border='primary' style={{ width:'19rem' }}>
                            <Card.Header>
                              <Line options={options} data={data} />
                            </Card.Header>
                            <Card.Body>
                              <Card.Title className='text-center fw-semibold'>
                                <FontAwesomeIcon icon={faStar} size='sm' /> PEN: Seleth Longsword <Badge bg='primary' pill>1</Badge>
                              </Card.Title>
                            </Card.Body>
                            <Card.Body className='pt-0'>
                              <p><span className='fw-semibold'>Base Price</span> 200000</p>
                              <p><span className='fw-semibold'>Total Trades</span> 311774</p>
                              <p><span className='fw-semibold'>Prices (Mix - Max)</span> 23100 - 231000</p>
                              <p><span className='fw-semibold'>Last Sold (1623625787)</span> 185000</p>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='1' className='recipe'>
                  <Accordion.Header className='fw-semibold text-primary mb-2'>Crafting Recipes</Accordion.Header>
                  <Accordion.Body className='p-2'>
                    <InputGroup>
                      <Form.Control
                        placeholder='Search for a recipes...'
                        aria-label='Search for a recipes...'
                        aria-describedby='basic-recipes'
                      />
                      <Button variant='primary' id='recipes-button'>
                        Search
                      </Button>
                    </InputGroup>
                    <div className='border-top mt-2'>
                      <div className='fw-semibold text-primary mb-2 ms-3'>Search Results</div>
                      <ul>
                        <li><FontAwesomeIcon icon={faStarRegular} size='sm' /> Item name here</li>
                        <li><FontAwesomeIcon icon={faStarRegular} size='sm' /> Item name here</li>
                        <li><FontAwesomeIcon icon={faStarRegular} size='sm' /> Item name here</li>
                        <li><FontAwesomeIcon icon={faStarRegular} size='sm' /> Item name here</li>
                        <li><FontAwesomeIcon icon={faStarRegular} size='sm' /> Item name here</li>
                      </ul>
                    </div>
                    <div className='border-top mt-2'>
                      <div className='fw-semibold text-primary mb-2 ms-3'>Bookmarked Recipes</div>
                      <Row>
                        <Col>
                          <Card border='primary' style={{ width:'19rem' }}>
                            <Card.Header className='text-center bg-primary text-white'><FontAwesomeIcon icon={faStar} size='sm' /> <FontAwesomeIcon icon={faFlask} size='sm' /> Elixir of Amity</Card.Header>
                            <Card.Body>                              
                              <div>
                                <h6 className='fw-semibold'>Components</h6>
                                  <ul className='ps-0 ms-0'>
                                    <li>2x Object Tangled in an Abandoned Net</li>
                                    <li>3x Object Tangled in an Abandoned Net</li>
                                    <li>12x Object Tangled in an Abandoned Net</li>
                                    <li>4x Object Tangled in an Abandoned Net</li>
                                    <li>2x Object Tangled in an Abandoned Net</li>
                                  </ul>
                                <h6 className='fw-semibold'>Products</h6>
                                  <ul className='ps-0 ms-0'>
                                    <li>2x Object Tangled in an Abandoned Net</li>
                                    <li>3x Object Tangled in an Abandoned Net</li>
                                  </ul>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col>
                          <Card border='primary' style={{ width:'19rem' }}>
                            <Card.Header className='text-center bg-primary text-white'><FontAwesomeIcon icon={faStar} size='sm' /> <FontAwesomeIcon icon={faFlask} size='sm' /> Elixir of Amity</Card.Header>
                            <Card.Body>                              
                              <div>
                                <h6 className='fw-semibold'>Components</h6>
                                  <ul className='ps-0 ms-0'>
                                    <li>2x Object Tangled in an Abandoned Net</li>
                                    <li>3x Object Tangled in an Abandoned Net</li>
                                    <li>12x Object Tangled in an Abandoned Net</li>
                                    <li>4x Object Tangled in an Abandoned Net</li>
                                    <li>2x Object Tangled in an Abandoned Net</li>
                                  </ul>
                                <h6 className='fw-semibold'>Products</h6>
                                  <ul className='ps-0 ms-0'>
                                    <li>2x Object Tangled in an Abandoned Net</li>
                                    <li>3x Object Tangled in an Abandoned Net</li>
                                  </ul>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col>
                          <Card border='primary' style={{ width:'19rem' }}>
                            <Card.Header className='text-center bg-primary text-white'><FontAwesomeIcon icon={faStar} size='sm' /> <FontAwesomeIcon icon={faFlask} size='sm' /> Elixir of Amity</Card.Header>
                            <Card.Body>                              
                              <div>
                                <h6 className='fw-semibold'>Components</h6>
                                  <ul className='ps-0 ms-0'>
                                    <li>2x Object Tangled in an Abandoned Net</li>
                                    <li>3x Object Tangled in an Abandoned Net</li>
                                    <li>12x Object Tangled in an Abandoned Net</li>
                                    <li>4x Object Tangled in an Abandoned Net</li>
                                    <li>2x Object Tangled in an Abandoned Net</li>
                                  </ul>
                                <h6 className='fw-semibold'>Products</h6>
                                  <ul className='ps-0 ms-0'>
                                    <li>2x Object Tangled in an Abandoned Net</li>
                                    <li>3x Object Tangled in an Abandoned Net</li>
                                  </ul>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                      <Row className='mt-2'>
                        <Col>
                          <Card border='primary' style={{ width:'19rem' }}>
                            <Card.Header className='text-center bg-primary text-white'><FontAwesomeIcon icon={faStar} size='sm' /> <FontAwesomeIcon icon={faDrumstickBite} size='sm' /> Elixir of Amity</Card.Header>
                            <Card.Body>                              
                              <div>
                                <h6 className='fw-semibold'>Components</h6>
                                  <ul className='ps-0 ms-0'>
                                    <li>2x Object Tangled in an Abandoned Net</li>
                                    <li>3x Object Tangled in an Abandoned Net</li>
                                    <li>12x Object Tangled in an Abandoned Net</li>
                                    <li>4x Object Tangled in an Abandoned Net</li>
                                    <li>2x Object Tangled in an Abandoned Net</li>
                                  </ul>
                                <h6 className='fw-semibold'>Products</h6>
                                  <ul className='ps-0 ms-0'>
                                    <li>2x Object Tangled in an Abandoned Net</li>
                                    <li>3x Object Tangled in an Abandoned Net</li>
                                  </ul>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col>
                          <Card border='primary' style={{ width:'19rem' }}>
                            <Card.Header className='text-center bg-primary text-white'><FontAwesomeIcon icon={faStar} size='sm' /> <FontAwesomeIcon icon={faDrumstickBite} size='sm' /> Elixir of Amity</Card.Header>
                            <Card.Body>                              
                              <div>
                                <h6 className='fw-semibold'>Components</h6>
                                  <ul className='ps-0 ms-0'>
                                    <li>2x Object Tangled in an Abandoned Net</li>
                                    <li>3x Object Tangled in an Abandoned Net</li>
                                    <li>12x Object Tangled in an Abandoned Net</li>
                                    <li>4x Object Tangled in an Abandoned Net</li>
                                    <li>2x Object Tangled in an Abandoned Net</li>
                                  </ul>
                                <h6 className='fw-semibold'>Products</h6>
                                  <ul className='ps-0 ms-0'>
                                    <li>2x Object Tangled in an Abandoned Net</li>
                                    <li>3x Object Tangled in an Abandoned Net</li>
                                  </ul>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col>
                          <Card border='primary' style={{ width:'19rem' }}>
                            <Card.Header className='text-center bg-primary text-white'><FontAwesomeIcon icon={faStar} size='sm' /> <FontAwesomeIcon icon={faDrumstickBite} size='sm' /> Elixir of Amity</Card.Header>
                            <Card.Body>                              
                              <div>
                                <h6 className='fw-semibold'>Components</h6>
                                  <ul className='ps-0 ms-0'>
                                    <li>2x Object Tangled in an Abandoned Net</li>
                                    <li>3x Object Tangled in an Abandoned Net</li>
                                    <li>12x Object Tangled in an Abandoned Net</li>
                                    <li>4x Object Tangled in an Abandoned Net</li>
                                    <li>2x Object Tangled in an Abandoned Net</li>
                                  </ul>
                                <h6 className='fw-semibold'>Products</h6>
                                  <ul className='ps-0 ms-0'>
                                    <li>2x Object Tangled in an Abandoned Net</li>
                                    <li>3x Object Tangled in an Abandoned Net</li>
                                  </ul>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='2' className='item'>
                  <Accordion.Header className='fw-semibold text-primary mb-2'>Items</Accordion.Header>
                  <Accordion.Body className='p-2'>
                    <InputGroup>
                      <Form.Control
                        placeholder='Search for an item...'
                        aria-label='Search for an item...'
                        aria-describedby='basic-item'
                      />
                      <Button variant='primary' id='item-button'>
                        Search
                      </Button>
                    </InputGroup>
                    <div className='border-top mt-2'>
                      <div className='fw-semibold text-primary mb-2 ms-3'>Search Results</div>
                      <ul>
                        <li><FontAwesomeIcon icon={faStarRegular} size='sm' /> Item name here</li>
                        <li><FontAwesomeIcon icon={faStarRegular} size='sm' /> Item name here</li>
                        <li><FontAwesomeIcon icon={faStarRegular} size='sm' /> Item name here</li>
                        <li><FontAwesomeIcon icon={faStarRegular} size='sm' /> Item name here</li>
                        <li><FontAwesomeIcon icon={faStarRegular} size='sm' /> Item name here</li>
                      </ul>
                    </div>
                    <div className='border-top mt-2'>
                      <div className='fw-semibold text-primary mb-2 ms-3'>Bookmarked Items</div>
                      <Row>
                        <Col>
                          <Card border='primary' style={{ width:'19rem' }}>
                            <Card.Header className='text-center bg-primary text-white'><FontAwesomeIcon icon={faStar} size='sm' /> Pine Plank</Card.Header>
                            <Card.Body>                              
                              <div>
                                <h6 className='fw-semibold'>Quest Reward</h6>
                                <ul className='ps-0 ms-0'>
                                  <li>Quest Name Here</li>
                                  <li>Quest Name Here</li>
                                  <li>Quest Name Here</li>
                                  <li>Quest Name Here</li>
                                </ul>
                                <h6 className='fw-semibold'>Product of</h6>
                                <ul className='ps-0 ms-0'>
                                  <li>Recipe Name</li>
                                  <li>Recipe Name</li>
                                  <li>Recipe Name</li>
                                  <li>Recipe Name</li>
                                </ul>
                                <h6 className='fw-semibold'>Obtained From</h6>
                                <ul className='ps-0 ms-0'>
                                  <li>NPC Name Here</li>
                                  <li>Node Name Here</li>
                                  <li>Item Name Here</li>
                                  <li>Entity Name Here</li>
                                </ul>
                                <h6 className='fw-semibold'>Exchange List</h6>
                                <ul className='ps-0 ms-0'>
                                  <li>NPC Barter Name Here</li>
                                  <li>Item Name Here</li>
                                </ul>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col>
                          <Card border='primary' style={{ width:'19rem' }}>
                            <Card.Header className='text-center bg-primary text-white'><FontAwesomeIcon icon={faStar} size='sm' /> Pine Plank</Card.Header>
                            <Card.Body>                              
                              <div>
                                <h6 className='fw-semibold'>Quest Reward</h6>
                                <ul className='ps-0 ms-0'>
                                  <li>Quest Name Here</li>
                                  <li>Quest Name Here</li>
                                  <li>Quest Name Here</li>
                                  <li>Quest Name Here</li>
                                </ul>
                                <h6 className='fw-semibold'>Product of</h6>
                                <ul className='ps-0 ms-0'>
                                  <li>Recipe Name</li>
                                  <li>Recipe Name</li>
                                  <li>Recipe Name</li>
                                  <li>Recipe Name</li>
                                </ul>
                                <h6 className='fw-semibold'>Obtained From</h6>
                                <ul className='ps-0 ms-0'>
                                  <li>NPC Name Here</li>
                                  <li>Node Name Here</li>
                                  <li>Item Name Here</li>
                                  <li>Entity Name Here</li>
                                </ul>
                                <h6 className='fw-semibold'>Exchange List</h6>
                                <ul className='ps-0 ms-0'>
                                  <li>NPC Barter Name Here</li>
                                  <li>Item Name Here</li>
                                </ul>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col>
                          <Card border='primary' style={{ width:'19rem' }}>
                            <Card.Header className='text-center bg-primary text-white'><FontAwesomeIcon icon={faStar} size='sm' /> Pine Plank</Card.Header>
                            <Card.Body>                              
                              <div>
                                <h6 className='fw-semibold'>Quest Reward</h6>
                                <ul className='ps-0 ms-0'>
                                  <li>Quest Name Here</li>
                                  <li>Quest Name Here</li>
                                  <li>Quest Name Here</li>
                                  <li>Quest Name Here</li>
                                </ul>
                                <h6 className='fw-semibold'>Product of</h6>
                                <ul className='ps-0 ms-0'>
                                  <li>Recipe Name</li>
                                  <li>Recipe Name</li>
                                  <li>Recipe Name</li>
                                  <li>Recipe Name</li>
                                </ul>
                                <h6 className='fw-semibold'>Obtained From</h6>
                                <ul className='ps-0 ms-0'>
                                  <li>NPC Name Here</li>
                                  <li>Node Name Here</li>
                                  <li>Item Name Here</li>
                                  <li>Entity Name Here</li>
                                </ul>
                                <h6 className='fw-semibold'>Exchange List</h6>
                                <ul className='ps-0 ms-0'>
                                  <li>NPC Barter Name Here</li>
                                  <li>Item Name Here</li>
                                </ul>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                      <Row className='mt-2'>
                      <Col>
                          <Card border='primary' style={{ width:'19rem' }}>
                            <Card.Header className='text-center bg-primary text-white'><FontAwesomeIcon icon={faStar} size='sm' /> Pine Plank</Card.Header>
                            <Card.Body>                              
                              <div>
                                <h6 className='fw-semibold'>Quest Reward</h6>
                                <ul className='ps-0 ms-0'>
                                  <li>Quest Name Here</li>
                                  <li>Quest Name Here</li>
                                  <li>Quest Name Here</li>
                                  <li>Quest Name Here</li>
                                </ul>
                                <h6 className='fw-semibold'>Product of</h6>
                                <ul className='ps-0 ms-0'>
                                  <li>Recipe Name</li>
                                  <li>Recipe Name</li>
                                  <li>Recipe Name</li>
                                  <li>Recipe Name</li>
                                </ul>
                                <h6 className='fw-semibold'>Obtained From</h6>
                                <ul className='ps-0 ms-0'>
                                  <li>NPC Name Here</li>
                                  <li>Node Name Here</li>
                                  <li>Item Name Here</li>
                                  <li>Entity Name Here</li>
                                </ul>
                                <h6 className='fw-semibold'>Exchange List</h6>
                                <ul className='ps-0 ms-0'>
                                  <li>NPC Barter Name Here</li>
                                  <li>Item Name Here</li>
                                </ul>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col>
                          <Card border='primary' style={{ width:'19rem' }}>
                            <Card.Header className='text-center bg-primary text-white'><FontAwesomeIcon icon={faStar} size='sm' /> Pine Plank</Card.Header>
                            <Card.Body>                              
                              <div>
                                <h6 className='fw-semibold'>Quest Reward</h6>
                                <ul className='ps-0 ms-0'>
                                  <li>Quest Name Here</li>
                                  <li>Quest Name Here</li>
                                  <li>Quest Name Here</li>
                                  <li>Quest Name Here</li>
                                </ul>
                                <h6 className='fw-semibold'>Product of</h6>
                                <ul className='ps-0 ms-0'>
                                  <li>Recipe Name</li>
                                  <li>Recipe Name</li>
                                  <li>Recipe Name</li>
                                  <li>Recipe Name</li>
                                </ul>
                                <h6 className='fw-semibold'>Obtained From</h6>
                                <ul className='ps-0 ms-0'>
                                  <li>NPC Name Here</li>
                                  <li>Node Name Here</li>
                                  <li>Item Name Here</li>
                                  <li>Entity Name Here</li>
                                </ul>
                                <h6 className='fw-semibold'>Exchange List</h6>
                                <ul className='ps-0 ms-0'>
                                  <li>NPC Barter Name Here</li>
                                  <li>Item Name Here</li>
                                </ul>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col>
                          <Card border='primary' style={{ width:'19rem' }}>
                            <Card.Header className='text-center bg-primary text-white'><FontAwesomeIcon icon={faStar} size='sm' /> Pine Plank</Card.Header>
                            <Card.Body>                              
                              <div>
                                <h6 className='fw-semibold'>Quest Reward</h6>
                                <ul className='ps-0 ms-0'>
                                  <li>Quest Name Here</li>
                                  <li>Quest Name Here</li>
                                  <li>Quest Name Here</li>
                                  <li>Quest Name Here</li>
                                </ul>
                                <h6 className='fw-semibold'>Product of</h6>
                                <ul className='ps-0 ms-0'>
                                  <li>Recipe Name</li>
                                  <li>Recipe Name</li>
                                  <li>Recipe Name</li>
                                  <li>Recipe Name</li>
                                </ul>
                                <h6 className='fw-semibold'>Obtained From</h6>
                                <ul className='ps-0 ms-0'>
                                  <li>NPC Name Here</li>
                                  <li>Node Name Here</li>
                                  <li>Item Name Here</li>
                                  <li>Entity Name Here</li>
                                </ul>
                                <h6 className='fw-semibold'>Exchange List</h6>
                                <ul className='ps-0 ms-0'>
                                  <li>NPC Barter Name Here</li>
                                  <li>Item Name Here</li>
                                </ul>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><FontAwesomeIcon icon={faStarRegular} size='sm' /> <Badge bg='success'>20% <FontAwesomeIcon icon={faChevronDown} size='sm' /></Badge> Item Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Line options={options} data={data} />
            <div className='pt-2'>
              <p><span className='fw-semibold'>Base Price</span> 200000</p>
              <p><span className='fw-semibold'>Total Trades</span> 311774</p>
              <p><span className='fw-semibold'>Prices (Mix - Max)</span> 23100 - 231000</p>
              <p><span className='fw-semibold'>Last Sold (1623625787)</span> 185000</p>
            </div>            
          </Modal.Body>
        </Modal>
      </main>
    </div>
  )
}
