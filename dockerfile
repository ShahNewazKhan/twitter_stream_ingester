# Dockerfile extending the generic Node image with application files for a
# single application.
FROM gcr.io/google_appengine/nodejs

RUN install_node v6.11
COPY . /app/

# You have to specify "--unsafe-perm" with npm install
# when running as root.  Failing to do this can cause
# install to appear to succeed even if a preinstall
# script fails, and may have other adverse consequences
# as well.
# This command will also cat the npm-debug.log file after the
# build, if it exists.

ARG NPM_TOKEN
ENV NPM_TOKEN ${NPM_TOKEN}

RUN npm install --unsafe-perm || \
  ((if [ -f npm-debug.log ]; then \
      cat npm-debug.log; \
    fi) && false)

RUN npm install apidoc -g
#RUN apidoc -i /app/controllers/ -o /app/apidoc
#RUN node /app/uploadApiDoc.js

RUN groupadd -r node && useradd -r -g node node
EXPOSE 3000
CMD npm start