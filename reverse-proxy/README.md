# reverse-proxy

Since it wasn't trivial to make calls over HTTPS on the NodeMCU, and AWS Lambda only works with HTTPS, I configured a Nginx instance working as a reverse proxy, from HTTP to HTTPS.

To run a Nginx with this config, just run:

```
./docker-run.sh
```
