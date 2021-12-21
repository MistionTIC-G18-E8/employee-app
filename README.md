# Employee App

Proyect made for MisionTIC Colombia, back-end node with express.js, front-end React.

Group:

- [Camilo Alfonso Chaves Hernández](https://github.com/camichaves79)
- [Erick Rafael Torres Posso](https://github.com/erictorresco)
- [Raúl José López Grau](https://github.com/galoryzen)
- [Javier Eduardo López Grau](https://github.com/muniter)

 Project [description](./RUBRICA.md) (spanish)

## Deployment

Full containerized solution:

The configuration works for production and development:

Containers:

- TLS Termination: traefik
- Reverse Proxy: nginx
- Database: mongodb
- API: node
- Front-end: react
- Front-end (build): node

Run development:

```bash
docker-compose up -d
```
Run production:

```bash
docker-compose -f docker-compose.yaml -f docker-compose.production.yaml up -d
```

For more information on the structure of the deployment checkout the compose files in the root of the repository.

- [docker-compose.yaml](docker-compose.yaml): Base
- [docker-compose.override.yaml](docker-compose.override.yaml): Overrides the base, used by the development
- [docker-compose.production.yaml](docker-compose.production.yaml): Used in production

And the DockerFiles for each of the custom images, leveraging multi-stage builds:

- [backend/Dockerfile](backend/Dockerfile)
- [frontend/Dockerfile](frontend/Dockerfile)
