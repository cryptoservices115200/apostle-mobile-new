export default () => {
    return (
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            
            <link href="https://www.jqueryscript.net/css/jquerysctipttop.css" rel="stylesheet" type="text/css">
            <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.css">
            <link rel="stylesheet" href="./main.css">
            <link rel="stylesheet" href="./theme-default.css">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
            
            <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
            <script src="./amigo-sorter.min.js"></script>
            <style>
                .large-text {
                    font-size: 24px;
                }
                .middle-text {
                    font-size: 18px;
                }
                .small-text {
                    font-size: 12px;
                }
                .border {
                    border: 1px solid gray;
                }
                .height-lg {
                    padding: 8px 15px;
                }
                ul {
                    list-style: none;
                    padding: 0;
                }
                .p-my-4 {
                    padding-top: 4px; 
                    padding-bottom: 4px;
                }
                .p-my-2 {
                    padding-top: 2px; 
                    padding-bottom: 2px;
                }
                .bar {
                    height: 28px;
                    border-radius: 1000px;
                }
                .bar1 {
                    height: 26px;
                    border-radius: 1000px;
                }
                .bar .sub-bar {
                    height: 28px;
                    border-radius: 1000px;
                }
                .bar1 .sub-bar {
                    height: 26px;
                    border-radius: 1000px;
                }
                .sm-chart {
                    padding-left: 0;
                    padding-right: 0;
                }
            </style>
            <script>
                $( function() {
                  $('ul.sorter').amigoSorter();
                });
            </script>
            <script>
                // ** hack - wait until script is loaded from CDN **
                function initProxy() {
                if (typeof window.rnRpc !== 'undefined') {
                    console.log('rnRpc loaded');
                    window.proxy = window.rnRpc.proxy(); // init a proxy object
                    window.rnRpc.expose( { document } ); // expose the document object
                } else {
                    setTimeout(initProxy, 500);
                }
                }
                initProxy();
                // **********************************************
                async function fireNativeAlert() {
                    await proxy.Alert.alert(
                      'What is your favorite color?',
                      'We got green and blue',
                      [
                        {text: 'Ask me later'},
                        {text: 'Green', onPress: window.rnRpc.proxyValue(() => setBgColor('green'))},
                        {text: 'Blue', onPress: window.rnRpc.proxyValue(() => setBgColor('blue'))},
                      ],
                      { cancelable: false }
                    );
                }
            </script>
        </head>
        <body>
            
          <div class="container">
            <div class="row">
              <div class="col-4">
              </div>
              <div class="col-8 middle-text border">
              AUGUST 10, 2021
              </div>
            </div>
            <div class="row">
              <div class="col-2">
              </div>
              <div class="col-1 small-text border">
              EST TIME
              </div>
              <div class="col-1 small-text border">
              ACTUAL TIME
              </div>
              <div class="col-8" style="padding: 0;">
                <div class="d-flex flex-row">
                    <div class="flex-grow-1 flex-fill small-text border text-center">7:00AM</div>
                    <div class="flex-grow-1 flex-fill small-text border text-center">7:30AM</div>
                    <div class="flex-grow-1 flex-fill small-text border text-center">8:00AM</div>
                    <div class="flex-grow-1 flex-fill small-text border text-center">8:30AM</div>
                    <div class="flex-grow-1 flex-fill small-text border text-center">9:00AM</div>
                    <div class="flex-grow-1 flex-fill small-text border text-center">9:30AM</div>
                    <div class="flex-grow-1 flex-fill small-text border text-center">10:00AM</div>
                    <div class="flex-grow-1 flex-fill small-text border text-center">10:30AM</div>
                    <div class="flex-grow-1 flex-fill small-text border text-center">11:00AM</div>
                    <div class="flex-grow-1 flex-fill small-text border text-center">11:30AM</div>
                </div>
              </div>
            </div>
            <div class="row border">
                <div class="col-4">
                    <div class="row">
                        <div class="col-6 height-lg border">
                            Preparation
                        </div>
                        <div class="col-3 middle-text border height-lg">
                        90m
                        </div>
                        <div class="col-3 middle-text border height-lg">
                            93m
                        </div>  
                    </div>
                    <div class="row">
                        <div class="col-6 small-text height-lg border">
                            <ul>
                                <li class="p-my-4">Cut 25g of cabbage</li>
                                <li class="p-my-4">Slice 24 onions</li>
                                <li class="p-my-4">Peel 8 potatoes</li>
                            </ul>
                        </div>
                        <div class="col-3 small-text border height-lg">
                            <ul>
                                <li class="p-my-4">10m</li>
                                <li class="p-my-2">
                                    <button style="padding: 0 5px; border-radius: 10px;"  onclick="fireNativeAlert()">START</button>
                                </li>
                                <li class="p-my-2">
                                    <button style="padding: 0 5px; border-radius: 10px;">START</button>
                                </li>
                            </ul>
                        </div>
                        <div class="col-3 small-text border height-lg">
                            <ul>
                                <li class="p-my-2">
                                    <button style="padding: 0 5px; border-radius: 10px;">END</button>
                                </li>
                            </ul>
                        </div>  
                    </div>
                    <div class="row">
                        <div class="col-6 height-lg border" style="padding-bottom: 10px;">
                            Cookie
                        </div>
                        <div class="col-3 middle-text border height-lg">
                        </div>
                        <div class="col-3 middle-text border height-lg">
                        </div>  
                    </div>
                    <div class="row">
                        <div class="col-6 small-text height-lg border">
                            <ul>
                                <li class="p-my-4">Cut 25g of cabbage</li>
                                <li class="p-my-4">Slice 24 onions</li>
                                <li class="p-my-4">Peel 8 potatoes</li>
                            </ul>
                        </div>
                        <div class="col-3 small-text border height-lg">
                            <ul>
                                <li class="p-my-4">10m</li>
                                <li class="p-my-2">
                                    <button style="padding: 0 5px; border-radius: 10px;">START</button>
                                </li>
                                <li class="p-my-2">
                                    <button style="padding: 0 5px; border-radius: 10px;">START</button>
                                </li>
                            </ul>
                        </div>
                        <div class="col-3 small-text border height-lg">
                            <ul>
                                <li class="p-my-2">
                                    <button style="padding: 0 5px; border-radius: 10px;">END</button>
                                </li>
                            </ul>
                        </div>  
                    </div>
                </div>
                <div class="col-8">
                    <ul class="sorter">
                        <li style="padding: 12px 6px; margin-bottom: 0;">
                            <span style="padding: 0px;border-radius: 1000px; background-color: rgba(0, 255, 255, 0.5);">
                                <div style="padding: 10px;border-radius: 1000px;width: 100px; background-color: rgba(0, 255, 255, 1);">
                                </div>
                            </span>
                        </li>
                        <li style="padding: 6px; margin-bottom: 0;">
                            <span style="padding: 0px;border-radius: 1000px; background-color: rgba(26, 95, 95, 0.5); width: 30%;">
                                <div style="padding: 10px;border-radius: 1000px;width: 100px; background-color: rgba(0, 255, 255, 1);">
                                </div>
                            </span>
                        </li>
                        <li style="padding: 6px; margin-bottom: 0;">
                            <span style="padding: 0px;border-radius: 1000px; background-color: rgba(26, 95, 95, 0.5); width: 30%; margin-left: 30%;">
                                <div style="padding: 10px;border-radius: 1000px;width: 100px; background-color: rgba(0, 255, 255, 1);">
                                </div>
                            </span>
                        </li>
                        <li style="padding: 6px; margin-bottom: 0;">
                            <span style="padding: 0px;border-radius: 1000px; background-color: rgba(26, 95, 95, 0.5); width: 45%; margin-left: 60%;">
                                <div style="padding: 10px;border-radius: 1000px;width: 100px; background-color: rgba(0, 255, 255, 1);">
                                </div>
                            </span>
                        </li>
                        <li>
                        <span style="padding: 10px;">Minory Report</span>
                        </li>
                        <li>
                        <span style="padding: 10px;">Alien</span>
                        </li>
                        <li>
                        <span style="padding: 10px;">Prometeus</span>
                        </li>
                    </ul>
                </div>
            </div>
          </div>
          
          <ul class="sorter col-8">
            <li class="row border">
                <div class="box height-lg" style="height: 44px">
                    <div class="total-bar-1 item bar" style="width: 60%; background-color: rgba(0, 255, 255, 0.5);" id="item1">
                        <div class="sub-bar" style="width: 90%; background-color: rgba(0, 255, 255, 1);">
                        </div>
                    </div>
                </div>
            </li>
            <li class="row height-lg" style="margin-bottom: 10px;">
                <div class="sm-chart" style="height: 28px;">
                    <div class="total-bar-1 item bar1" style="width: 20%; background-color: rgba(0, 132, 250, 0.5);" id="item1">
                        <div class="sub-bar" style="width: 100%; background-color: rgba(0, 132, 250, 1);">
                        </div>
                    </div>
                </div>
                <div class="sm-chart" style="height: 28px">
                    <div class="total-bar-1 item bar1" style="width: 20%; margin-left: 20%; background-color: rgba(0, 132, 250, 0.5);" id="item1">
                        <div class="sub-bar" style="width: 100%; background-color: rgba(0, 132, 250, 1);">
                        </div>
                    </div>
                </div>
                <div class="sm-chart" style="height: 28px">
                    <div class="total-bar-1 item bar1" style="width: 25%; margin-left: 40%; background-color: rgba(0, 132, 250, 0.5);" id="item1">
                        <div class="sub-bar" style="width: 70%; margin-left: 10%; background-color: rgba(0, 132, 250, 1);">
                        </div>
                    </div>
                </div>
            </li>
            <li class="row border">
                <div class="box height-lg" style="height: 44px">
                    <div class="total-bar-1 item bar" style="width: 60%; background-color: rgba(0, 255, 255, 0.5);" id="item1">
                        <div class="sub-bar" style="width: 90%; background-color: rgba(0, 255, 255, 1);">
                        </div>
                    </div>
                </div>
            </li>
            <li class="row height-lg">
                <div class="sm-chart" style="height: 28px;">
                    <div class="total-bar-1 item bar1" style="width: 20%; background-color: rgba(0, 132, 250, 0.5);" id="item1">
                        <div class="sub-bar" style="width: 100%; background-color: rgba(0, 132, 250, 1);">
                        </div>
                    </div>
                </div>
                <div class="sm-chart" style="height: 28px">
                    <div class="total-bar-1 item bar1" style="width: 20%; margin-left: 20%; background-color: rgba(0, 132, 250, 0.5);" id="item1">
                        <div class="sub-bar" style="width: 100%; background-color: rgba(0, 132, 250, 1);">
                        </div>
                    </div>
                </div>
                <div class="sm-chart" style="height: 28px">
                    <div class="total-bar-1 item bar1" style="width: 25%; margin-left: 40%; background-color: rgba(0, 132, 250, 0.5);" id="item1">
                        <div class="sub-bar" style="width: 70%; margin-left: 10%; background-color: rgba(0, 132, 250, 1);">
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        </body>
        </html>
        `
    )
}
