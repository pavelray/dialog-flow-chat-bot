const dfMessenger = document.querySelector('df-messenger');
dfMessenger.addEventListener('df-response-received', function (event) {
  console.log(event);
  setTimeout(()=>{
    const response = event.detail.response.queryResult.fulfillmentMessages;
    if (response.length > 0) {
      response.forEach(element => {
        if (element.card) {
          const payload =
            [{
              "type": "info",
              "title": element.card.title,
              "subtitle": element.card.subtitle,
              "image": {
                "src": {
                  "rawUrl": element.card.imageUrl
                }
              },
              "actionLink": element.card.buttons[0].postback
            }];
          dfMessenger.renderCustomCard(payload);
        }
        else if (element.quickReplies) {
          const options = element.quickReplies.quickReplies.map(el => {
            return {
              "text": el
            }
          })
          const payload = [
            {
              "type": "chips",
              "options": options
            }
          ]
          dfMessenger.renderCustomCard(payload);
        }
      });
    }

  },1000)
});