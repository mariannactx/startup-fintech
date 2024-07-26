docker build -f ./api/api.Dockerfile ./api --no-cache
docker build -f ./redis-consumer/redis-consumer.Dockerfile ./redis-consumer --no-cache
docker compose up -d