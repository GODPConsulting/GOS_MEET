export GITCOMMIT=$(git rev-parse --short HEAD)
export GITREF="$(git log -1 --pretty=format:"%D")"
export GITTIMESTAMP="$(git log -1 --pretty=format:"%ai")"

export ANNOUNCED_IP=54.159.14.157
export SITE_HOST=goserp.co.uk
export FRONTEND_DNS_OR_IP=www.goserp.co.uk
export STRIVE_TOKEN_SECRET=57ca7f82bf274a3a97f45316f366ad0d
export STRIVE_API_KEY=a57e504a1ac0410281a28bc38e8e1261

export MEDIASOUP_MIN_PORT=40000 # Minimun RTC port for ICE, DTLS, RTP, etc.
export MEDIASOUP_MAX_PORT=49999 # Maximum RTC port for ICE, DTLS, RTP, etc.

docker-compose -f docker-compose.yml -f docker-compose.override.yml -f docker-compose.traefik.yml -f docker-compose.prod.yml up --build
