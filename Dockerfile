    FROM  node:12.6.0

    WORKDIR /Desktop/wayFarer-Api-Real-Project

    COPY ./ ./ 

    RUN npm install

    CMD [ "/bin/bash"]



