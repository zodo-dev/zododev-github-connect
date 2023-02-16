FROM zododevhub/nodejs:14 as builder

USER root
COPY --chown=zcloud:zcloud . /workspace/app
RUN chown zcloud:zcloud /workspace -R

USER zcloud
WORKDIR /workspace/app
RUN npm install && npm run build:storybook-full

FROM docker.io/library/node:14-alpine

ENV APP_ID = ""
ENV CLIENT_ID = ""
ENV CLIENT_SECRET = ""

USER node
COPY --from=builder --chown=node:node /workspace/app/storybook-dist /app
WORKDIR /app
RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start"]
