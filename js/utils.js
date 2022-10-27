document.addEventListener('DOMContentLoaded', (event) => {
    // -----START IS ON SCREEN-----
    // Helper function from: http://stackoverflow.com/a/7557433/274826
    const isElementInViewport = el => {
        const pixFromElementTop = 1;
        // special bonus for those using jQuery
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }
        let rect = el.getBoundingClientRect();
        return (
            (rect.top + pixFromElementTop <= 0 && rect.bottom >= 0) ||
            (rect.bottom + pixFromElementTop >=
                (window.innerHeight || document.documentElement.clientHeight) &&
                rect.top + pixFromElementTop <=
                (window.innerHeight || document.documentElement.clientHeight)) ||
            (rect.top + pixFromElementTop >= 0 &&
                rect.bottom + pixFromElementTop <=
                (window.innerHeight || document.documentElement.clientHeight))
        );
    };
    // Detect request animation frame
    let scroll =
        window.requestAnimationFrame ||
        // IE Fallback
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    let elementsToShow = document.querySelectorAll(".show-on-scroll");

    const loop = () => {
        Array.prototype.forEach.call(elementsToShow, function (element) {
            if (isElementInViewport(element)) {
                element.classList.add("is-visible");
            } else {
                element.classList.remove("is-visible");
            }
        });
        scroll(loop);
    };

    // Call the loop for the first time
    loop();

    // -----END IS ON SCREEN-----


    // const isMobile = (width, mobileWidth) => { return width <= mobileWidth }

    //----- FLOATING PHONE BUTTON AND ONANDOFF -----
    const isMobile = () => { return screen.width <= 900; }

    const isServiceOpen = () => {
        const friday = 5, saturday = 6 //sunday = 0;
        const date = new Date();
        const day = date.getDay(), hour = date.getHours(), minutes = date.getMinutes();
        const time = hour + minutes / 100;
        const openingTime = 9.00, closingTime = 18.00; // 9:00 - 18:30
        const openingTimeFriday = 9.00, closingTimeFriday = 13.00; // 9:00 - 13:30
        // const holidayOpeningTime = 9.00, holidayClosingTime = 13.30;
        const isWeekend = day === friday || day === saturday;
        const isOpenTime = time >= openingTime && time <= closingTime;
        const isOpenTimefriday = time >= openingTimeFriday && time <= closingTimeFriday;
        // const isHolidayTime = time >= openingTime && time <= holidayClosingTime;
        const holidayDays = []; // first day act like friday
        const isHolidayDay = holidayDays.includes(day);
        const firstHolidayDay = holidayDays[0]; //will have friday closing hours
        if (isWeekend || isHolidayDay) {
            if (day === saturday)
                return false;

            return (day === firstHolidayDay && isOpenTimefriday) || (day === friday && isOpenTimefriday) ?
                true : false;
        }
        else return isOpenTime;
    }


    const cta = document.getElementsByClassName("callPhone-fixed");
    cta[0].style.display = "none";

    if (isServiceOpen()) {
        if (isMobile()) { cta[0].style.display = "block"; }
        timerPlus("5e2efacb8f7cea00173c2a95");
    }
    else
        cta[0].style.display = "none";
    //----- FLOATING PHONE BUTTON AND ONANDOFF END -----



    //------ SHOW CTA BUTTON ON MOBILE ------
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        if ($(window).width() < 1080) {
            if (scrollTop > 250) {
                $("#stripForm").fadeIn();
                clearTimeout($.data(this, "scrollTimer"));
            } else {
                clearTimeout($.data(this, "scrollTimer"));
                $("#stripForm").fadeOut();
            }
        } else {
            if (scrollTop > 900) {
                $("#stripForm").fadeIn();
                clearTimeout($.data(this, "scrollTimer"));
            } else {
                clearTimeout($.data(this, "scrollTimer"));
                $("#stripForm").fadeOut();
            }
        }
    });
    //------ SHOW CTA BUTTON ON MOBILE END -----



    // -----START isCustomerExist-----
    $('.divhidden').hide();
    $('#input_10').change(function () {
        if ($(this).val() == 'current') {
            $('.divhidden').show();
        } else {
            $('.divhidden').hide();
        }
    });
    // -----END isCustomerExist-----

    // -----START EMAIL VALIDATION-----
    const isNumberKey = (evt) => {
        let charCode = (evt.which) ? evt.which : evt.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }
    let phoneNumberInput = document.getElementById("Phone_1");
    phoneNumberInput.onkeypress = isNumberKey

    // const validateEmail = (email) => {
    //     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return re.test(String(email).toLowerCase());
    // }

    const validatePhone = (phone) => {
        // const re = /^[0-9]{10}$/;
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

        return re.test(String(phone));
    }

    const validateForm = () => {
        let flag = false, firstName = document.getElementById("firstName"), input_10 = document.getElementById("input_10")
        Phone_1 = document.getElementById("Phone_1"), message = document.getElementById("message");
        if (input_10.value === "") {
            input_10.classList.add("error");
            flag = true;
        }
        if (firstName.value.length < 2) {
            firstName.classList.add("error");
            flag = true;
        }
        if (validatePhone(Phone_1.value) === false) {
            Phone_1.classList.add("error");
            flag = true;
        }
        if (flag) {
            message.innerHTML = "אנא מלא/י את כל השדות";
            message.classList.add("error");
        }
        return flag ? false : true;
    }
    const submitForm = (e) => {
        e.preventDefault();

        if (validateForm()) {
            var form = document.querySelector('#top');
            var data = serialize(form);
            e.preventDefault();
            // var data = $(this).serialize();
            // console.log(data)
            $.ajax({
                type: "GET",
                url: 'https://syatacrm.co.il/API9/mgrqispi94.dll?appname=Syata&prgname=Get_Leads_receiving_web&WD=Sderot&projectId=SD&key=googletv1lead',
                data: data,
            });

            $.ajax({
                type: "POST",
                url: './mail.php',
                data: data,
                success: function (mail) {
                    // alert('הפרטים נשלחו בהצלחה');
                    window.location.href = 'thankyou.html';
                }
            });

            $.ajax({
                type: "POST",
                url: 'https://www.targetcall.tempurl.co.il/mailphp/partner-tv.co-free-tv-screen/mail.php',
                data: data,
                success: function (mail) {
                    window.location.href = 'https://partner-tv.co/thankyoupage/';
                }
            });

            return true

        } else {
            return false
        }
    }
    $('#top').submit(submitForm)
    // -----END EMAIL VALIDATION-----



    // ----- GET URL PARAMS -----
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    // Give the URL parameters variable names
    var campaign = getParameterByName('utm_campaign');
    var term = getParameterByName('utm_term');
    var campaignID = getParameterByName('campaignID');

    // Put the variable names into the hidden fields in the form.
    document.getElementById("utm_campaign").value = campaign;
    document.getElementById("utm_term").value = term;
    document.getElementById("campaignID").value = campaignID;
    // ----- GET URL PARAMS END -----

    /*!
    * Serialize all form data into a query string
    * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
    * @param  {Node}   form The form to serialize
    * @return {String}      The serialized form data
    */
    var serialize = function (form) {
        // Setup our serialized data
        var serialized = [];
        // Loop through each field in the form
        for (var i = 0; i < form.elements.length; i++) {
            var field = form.elements[i];
            // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
            if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;
            // If a multi-select, get all selections
            if (field.type === 'select-multiple') {
                for (var n = 0; n < field.options.length; n++) {
                    if (!field.options[n].selected) continue;
                    serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
                }
            }
            // Convert field data to a query string
            else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
                serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
            }
        }
        return serialized.join('&');
    }



    //slick
    $('.slickArea').slick({
        //rtl: true,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        // nextArrow: '<span class="arrowSide arrR"></span>',
        // prevArrow: '<span class="arrowSide arrL"></span>',
        focusOnSelect: true,
        autoplay: false,
        rtl: true,

        responsive: [
            {
                breakpoint: 1024,
                centerMode: true,

                settings: {
                    dots: false,
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    autoplay: false,
                    slidesToShow: 2,
                    initialSlide: 2,
                }
            }
        ]
    });


    // document.addEventListener('touchstart', onTouchStart, { passive: true });



    var myVar = setInterval(function () {
        let imageToLoad = document.getElementById("wait")
        if (imageToLoad.complete) { // checks if image is loaded
            imageToLoad.classList.add("loaded");
            clearInterval(myVar);
        }
    }, 500);

});

