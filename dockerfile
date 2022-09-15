FROM node:12.22.9-alpine
ENV NODE_ENV=production
WORKDIR /api
COPY "package.json" "./"
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
