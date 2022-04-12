## Getting Started

To get the dev server started, run:

```bash
npm i
npx prisma db push
npm run dev
```

If you'd like to use Docker, you can do the following:

```bash
sudo docker run --name=codezone -p 3000:3000 -p 5555:5555 kylandodds/webserver:latest
```

The server will host on https://localhost:3000.
