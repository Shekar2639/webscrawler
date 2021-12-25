setInterval(async () => {
  const response = await fetch("/subscribe");
  const names = await response.json();
  if(names.item && names.item.price<=3){
      window.open('https://www.magiceden.io/item-details/'+names.item.mintAddress,"_blank").focus();
  }
}, 3000);


setInterval(async () => {
    const response = await fetch("/subscribe2");
    const names = await response.json();
    if(names.item && names.item.price<=3){
        window.open('https://solanart.io/search/?token='+names.item.token_add,"_blank").focus();
    }
  }, 3000);