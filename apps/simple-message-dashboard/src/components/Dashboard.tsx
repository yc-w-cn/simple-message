import {
  Statistic,
  Flex,
  Card,
  Typography,
  Space,
  Table,
  ConfigProvider,
} from 'antd';
import { serviceName, socket } from '../common/socket';
import Footer from './Footer';
import {
  DisconnectOutlined,
  LinkOutlined,
  MessageOutlined,
  NodeIndexOutlined,
} from '@ant-design/icons';
import OperationButton from './OperationButton';
import { useEffect, useState } from 'react';

const { Title } = Typography;

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [connectedIds, setConnectedIds] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onHeartbeatEvent(message: string) {
      console.log(`Received heartbeat: ${message}`);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('heartbeat', onHeartbeatEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('heartbeat', onHeartbeatEvent);
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-[#1c1b27] flex justify-center items-center">
      <Flex gap={10}>
        <Space
          className="bg-[#212030] px-2 py-5 rounded-2xl"
          direction="vertical"
        >
          <OperationButton
            text="连接"
            icon={<LinkOutlined />}
            onClick={() => {
              socket.connect();
            }}
          />
          <OperationButton
            text="节点"
            icon={<NodeIndexOutlined />}
            onClick={() => {
              socket.emit('list_connected_client_ids', (response: any) => {
                console.log('list_connected_client_ids', response);
                setConnectedIds(response);
              });
            }}
          />
          <OperationButton
            text="消息"
            icon={<MessageOutlined />}
            onClick={() => {
              socket.emit('list_recent_messages', (response: any) => {
                console.log('list_recent_messages', response);
                setMessages(response);
              });
            }}
          />
          <OperationButton
            text="断开"
            icon={<DisconnectOutlined />}
            onClick={() => {
              socket.disconnect();
            }}
          />
        </Space>
        <div className="bg-[#212030] w-[800px] h-[600px] rounded-2xl box-border px-8 py-2 relative">
          <Title level={2} className="mt-2 mb-0">
            Simple Message Dashboard
          </Title>
          <div className="grid grid-flow-col gap-4 justify-stretch">
            <Card className="bg-[#2b2c3d]" bordered={false}>
              <Statistic title="服务" value={serviceName} />
            </Card>
            <Card className="bg-[#2b2c3d] min-w-[120px]" bordered={false}>
              <Statistic
                title="节点"
                className="text-white"
                value={`${connectedIds.length}`}
                prefix
              />
            </Card>
            <Card className="bg-[#2b2c3d] min-w-[120px]" bordered={false}>
              <Statistic title="事件" className="text-white" value={0} />
            </Card>
            <Card className="bg-[#2b2c3d] min-w-[120px]" bordered={false}>
              <Statistic title="消息" className="text-white" value={0} />
            </Card>
            <Card className="bg-[#2b2c3d] min-w-[120px]" bordered={false}>
              <Statistic
                title="状态"
                className="text-white"
                value={isConnected ? '已连接' : '未连接'}
              />
            </Card>
          </div>
          <Card
            title="最新消息"
            className="bg-[#2b2c3d] h-[350px] mt-4"
            bordered={false}
          >
            {messages.length === 0 ? (
              <Flex justify="center" align="center" className="h-[220px]">
                <span>暂无数据</span>
              </Flex>
            ) : (
              <ConfigProvider
                theme={{
                  token: {
                    colorBgContainer: 'transparent',
                  },
                }}
              >
                <Table
                  dataSource={messages}
                  columns={[
                    { title: 'Client', dataIndex: 'clientId' },
                    {
                      title: 'Event',
                      dataIndex: 'eventName',
                    },
                    {
                      title: 'DateTime',
                      dataIndex: 'gmtCreatedAt',
                    },
                  ]}
                  pagination={false}
                  size="small"
                ></Table>
              </ConfigProvider>
            )}
          </Card>
          <Footer />
        </div>
      </Flex>
    </div>
  );
}

export default App;
