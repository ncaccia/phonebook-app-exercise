# phonebook-app

Deployment: render.com

[Online app link](https://phonebook-app-exercise.onrender.com/)

### Exercise 3.10 Phonebook backend

- [x] Render.com console
      ![Console Logs](assets/render-dashboard.png)

- [x] Test completed through Hoppscotch (open source altenative to Postman)
      ![GET request screenshot](assets/image.png)
      ![POST request screenshot](assets/image-1.png)

### Exercise 3.11 Phonebook backend

- [x] Production build of my frontend, and add it to Render.com Internet application.
      ![alt text](assets/dist-updated-deploy.png)

- [x] Proxy added to frontend, still working locally (npm run dev).
      ![alt text](assets/frontend-proxy.png)
      ![alt text](assets/single-page-app-onrender.png)

## Extra stapes:

- [x] Streamline commands for deployment:
  ```
  "build:ui": "rm -rf dist && cd ../../part02/the-phonebook && npm run build && cp -r dist ../../part03/phonebook-exercise/",
  "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push"
  ```
  ![alt text](assets/streamline-command.png)
