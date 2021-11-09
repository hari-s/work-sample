# Build Stage 1
#
FROM node:14-alpine as build

WORKDIR /workspace

# Copy root configuration files
COPY package.json yarn.lock tsconfig.json ./
# Copy the code for all packages
COPY src/ ./src/

# Installs the packages
RUN yarn install

# Builds every package in the repo
RUN yarn build


# Build Stage 2
#
FROM node:14 AS production

# Copy build files from build stage
COPY --from=build workspace/dist/ /app/dist
# Copy root configuration files
COPY package* ./app
COPY yarn.lock ./app

WORKDIR /app

RUN yarn install --production
