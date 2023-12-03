import asyncio
import socketio

# asyncio
sio = socketio.AsyncClient()


@sio.event
def connect():
    print("I'm connected!")


@sio.on('heartbeat')
def on_message(data):
    print('I received a message! ' + data)


@sio.event
async def disconnect():
    print('disconnected from server')


async def main():
    await sio.connect('http://localhost:3000')
    await sio.wait()

if __name__ == '__main__':
    asyncio.run(main())
