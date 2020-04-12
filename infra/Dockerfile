FROM golang:latest
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build ./cmd/main.go
EXPOSE 8080
ADD start.sh /
RUN chmod +x /start.sh
CMD ["/start.sh"]