import socketio, uvicorn

sio = socketio.AsyncServer(async_mode='asgi')
app = socketio.ASGIApp(sio, static_files={ "/": "./static/" })

@sio.event
async def connect(sid, environ):
  ln = "{} ON".format(sid)
  print()
  print(ln)
  print()

@sio.event
async def disconnect(sid):
  ln = "{} OFF".format(sid)
  print()
  print(ln)
  print()

if __name__ == "__main__":
  uvicorn.run(app)
