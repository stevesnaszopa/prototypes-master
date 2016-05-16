var SLIDERAPP = (function(){

          var slider = document.getElementById("amount-slider");
          var box = document.getElementById("deposit");
          var installment = document.getElementById("monthly");
          var container = document.querySelectorAll(".slider-container")[0];
          var summarytotal = document.getElementById("totalcost");
          var summaryfinance = document.getElementById("zopafinance");
          var summarydeposit = document.getElementById("deposittopay");
          var bv;
          var summarybox = document.getElementById("summaryresults");
          var confirm = document.getElementById("submitdeposit");
          var depositchoice = document.getElementById("depositchoice");
          var urlline;

          //get deposit value from slider
          var printValue = function(){
            slider.onmousemove = function(){
              box.value = slider.value;
              monthlyPayments(box.value);
              setbreakdown(box.value);
              chooseagain();
            };
          };

          //calculate monthly repayments
          var monthlyPayments = function(x){
            y = (((3000 - x)/12).toFixed(2));
            installment.textContent = y;
          };

          //make slider buttons work
          var buttonwork = function(e){
            var bv = parseInt(box.value, 10);
            if(event.target.id === "increase"){
              if(bv < 3000){
                bv += 50;
                box.value = bv;
                monthlyPayments(bv);
                setbreakdown(bv);
                chooseagain();
              }
            }

            else if(event.target.id === "decrease"){
              if(bv > 0){
                bv -= 50;
                box.value = bv;
                monthlyPayments(bv);
                setbreakdown(bv);
                chooseagain();
              }
            }
            slider.value = box.value;
          };

          //Trigger slider event
          var buttonpush = function(){
            container.addEventListener(
              "click",
              function(event){
                buttonwork(event);
              },
              false
            )
          };

          //Update breakdown box
          var setbreakdown = function(x){
            summaryfinance.textContent = (3000 - x);
            summarydeposit.textContent = x;
            depositchoice.value = x;
          };

          //Confirm choice
          var confirmchoice = function(){
            if (summarybox.className === "important box"){
              summarybox.setAttribute("class", "result box boxselected");
              summarytotal.setAttribute("class", "textselected");
              summarydeposit.setAttribute("class", "textselected");
              summaryfinance.setAttribute("class", "textselected");
              installment.setAttribute("class", "textselected");
              confirm.setAttribute("class", "disabled");
            }
          };

          var chooseagain = function(){
            if(summarybox.className === "result box boxselected"){
              summarybox.setAttribute("class", "important box");
              summarytotal.removeAttribute("class", "textselected");
              summarydeposit.removeAttribute("class", "textselected");
              summaryfinance.removeAttribute("class", "textselected");
              installment.removeAttribute("class", "textselected");
              confirm.removeAttribute("class", "disabled");
            }
          };

          //Confirm button
          var confirmbutton = function(){
            confirm.addEventListener(
              "click",
              confirmchoice,
              false
            )
          };

          return {
            init: printValue,
            init2: buttonpush,
            init3: confirmbutton,
          }

        })();

SLIDERAPP.init();
SLIDERAPP.init2();
 SLIDERAPP.init3();
