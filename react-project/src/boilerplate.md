    /*********** Sample Remoting Call *********/
    
    Visualforce.remoting.Manager.invokeAction('CONTROLLER_NAME.METHOD_NAME', function (result, event) {
      if (event.status) {
        console.log(event.result);
      } else if (event.type === 'exception') {
        console.log(event);
      }
      else {
        console.log(event);
      }
    });