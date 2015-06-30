$(document).ready(function(){


    // JSVectorMap
    // http://jvectormap.com/

    // Steps:

    // Step 1:
    // Get HTML Working - with JSVector Map to just display a map
    // Assign colors to countries
    // Have hover states over countries

    // Step 2:
    // Clicking on an empire, queries the WIKI Api
    // Displays the Wikipedia Paragraph
    // Has a link to the wikipedia page



    // Use objects and arrays to to store a mapping of empires to countries
    var empires = [
        {
            name: 'Babylonia',
            countries: ["IQ", "IR", "TR", "SY", "LB", "IL", "JO", "SA","EG"],
            colorValue: 10
        },
        {
            name: 'Mongol Empire',
            countries: ["CN", "MN", "AF", ""],
            colorValue: 100
        },
        {
            name: 'Ottoman Empire',
            countries: ["IT", "AT","SK", "UA", "GE", "AM", "AZ", "OM", "YE", "SS", "SD", "MA", "DZ", "LY", "TN", "PS","-99", "CY", "KW", "QA", "AE", "TR", "GR", "BG", "RO", "MD", "MK", "AL", "_0", "RS", "BA", "HR", "SI", "HU"],
            colorValue: 110
        },
        {
            name: 'Adal Sultanate',
            countries: ["SO", "_1", "DJ", "ET", "ER"],
            colorValue: 300
        },
        {
            name: 'Inca Empire',
            countries: ["PE", "EC", "BO", "AR", "CL", "CO"],
            colorValue: 400
        },
        {
            name: 'Mali Empire',
            countries: ["SN", "MR", "ML", "BF", "NE", "GN", "GW","CI", "GH"],
            colorValue: 500
        },
        {
            name: 'British Empire',
            countries: ["US", "GB", "AU", "BS", "BD", "BZ", "BW", "BN", "CA", "FJ", "GY", "IN", "JM", "KE", "LS", "MW", "MY", "MZ", "NA", "NZ", "NG", "PK", "PG", "RW", "SB", "ZA", "LK", "SZ", "TZ", "TT", "VU", "ZM", "GM", "IE", "ZW", "SR", "BT", "SL", "MM", "UG"],
            colorValue: 600
        },
        {
            name: 'Russian Empire',
            countries: ["RU", "PL", "FI",  "BY", "EE", "LV", "LT", "KZ", "UZ", "TM", "KG", "TJ"],
            colorValue: 700,
        },
        {
            name: 'Empire of Japan',
            countries: ["KP", "KR", "VN", "KH", "LA", "TH", "PH", "ID", "TL", "JP", "TW" ],
            colorValue: 800,
        },
        {
            name: 'French Empire',
            countries: ["GA", "CG", "CD", "EH", "CF", "BJ", "TG", "TD","MG","FR", "CM"],
            colorValue: 900,
        },
        {
            name: 'Aztec Empire',
            countries: ["MX", "GT"],
            colorValue: 1000,
        },
        {
            name: 'Spanish Empire',
            countries: ["HN", "NI", "SV", "CR", "CU", "VE", "PA", "UY", "PY", "DO", "ES"],
            colorValue: 1100,
        },
        {
            name: 'Portugal Empire',
            countries: ["AO", "BR", "PT"],
            colorValue: 1040,
        }
    ];
//create empty array
    var empireCountries = {};

    $.each(empires, function(index, empire) {
      $.each(empire.countries, function(countryIndex, country) {
        empireCountries[country] = empire.colorValue;
      });
    });


// Create hover over countries in empire - highlights the

    $('#world-map').vectorMap({
        map: 'world_mill_en',
        series: {
            regions: [{
                values: empireCountries,
                scale: ['#F20F0F', '#B6228D', '#6F1717', '#274B2C', '#FF860D', '#DC23A0', '#46361E', '#A8D09A', '#239878', '#58182A', '#B58B8B', '#BFD712'],
                normalizeFunction: 'polynomial'
            }]
        },
        onRegionTipShow: function(e, el, code) {
            //locateEmpires(code);
            // console.log('this is the ' + empireName);
             el.html(el.html()+': '+locateEmpires(code));
            // display the name of the empire
        },
        onRegionClick: function(e, code) {
           var empireSearch = locateEmpires(code);
           getWikiPage(empireSearch);
        }
    });
    
    function locateEmpires(countryCode) {
        var empireName = "no empire defined";
      $.each(empires, function(index, empire) {
        //loop through empires
        //see if empire.countries contains countrycode
        if (_.contains(empire.countries, countryCode)){
          //get the empire Name
          $(".empires").html(empire.name);
          // console.log(empire.name);
          empireName = empire.name;
        }
      });
      return empireName;
    }

//fucntion for the api tp get the info from google and query what we need
   function getWikiPage(pageTitle) {
        $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + pageTitle,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                // code to parse data
                var articleID = _.keys(data.query.pages)[0];
                var pageExtract = data.query.pages[articleID].extract;
                // add this page Extract to the text content of some HTML element
                $(".modal-body").html(pageExtract);

                //add the extract to the modal
                $(".modal-title").html(pageTitle);
                // use bootstrap to call a modal function
                $('.modal-link').attr('href', 'https://en.wikipedia.org/wiki/' + pageTitle);
                $('#myModal').modal();

                // add a more link that points to "http://en.wikipedia.org/wiki/" + pageTitle
                //('.modal-link')attr('href', 'http://en.wikipedia.org/wiki/'+ pageTitle);
            },
            error: function(data, textStatus, jqXHR) {
                // code to parse errors
            }
        });
    }
});

