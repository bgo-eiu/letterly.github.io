alltimearray = []
day = "Monday"
yearObject = {}
interCal = {}
jmlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]





function religionize(cl, att){
    c2r = {
        "Hebrew": {
            name: "Judaism",
            link: "https://en.wikipedia.org/wiki/Judaism",
        },
        "Islamic Tabular": {
            name: "Islam",
            link: "https://en.wikipedia.org/wiki/Islam",
        },
        "Gregorian": {
            name: "Christianity",
            link: "https://en.wikipedia.org/wiki/Christianity",
        },
        "Julian": {
            name: "Eastern Orthodox Christianity",
            link: "https://en.wikipedia.org/wiki/Eastern_Orthodoxy",
        },
        "Ethiopian": {
            name: "Ethiopian Orthodox Christianity",
            link: "https://en.wikipedia.org/wiki/Ethiopian_Orthodox_Tewahedo_Church",
        },
        "Nanakshahi": {
            name: "Sikhism",
            link: "https://en.wikipedia.org/wiki/Sikhism",
        },
        "Solar Hijri": {
            name: "Iran",
            link: "https://en.wikipedia.org/wiki/Culture_of_Iran",
        },
        "Javanese": {
            name: "Java",
            link: "https://en.wikipedia.org/wiki/Javanese_culture",
        },
        "Mandaean": {
            name: "Mandaeism",
            link: "https://en.wikipedia.org/wiki/Mandaeism",
        },
        "Western Christianity": {
            link: "https://en.wikipedia.org/wiki/Western_Christianity",
        },
        "Bahá'í": {
            name: "Bahá'í Faith",
            link: "https://en.wikipedia.org/wiki/Bah%C3%A1%CA%BC%C3%AD_Faith",
        },
        "Solar Hijri": {
            name: "Iranian",
            link: "https://en.wikipedia.org/wiki/Persians",
        },
        "Fasli (Zoroastrian)": {
            name: "Zoroastrianism",
            link: "https://en.wikipedia.org/wiki/Zoroastrianism",
        },
        "Armenian Christianity": {
            link: "https://en.wikipedia.org/wiki/Armenian_Apostolic_Church",
        },
        "Shia Islam": {
            link: "https://en.wikipedia.org/wiki/Shia_Islam",
        },
        "Sunni Islam": {
            link: "https://en.wikipedia.org/wiki/Shia_Islam",
        },
        "Twelver Shia Islam": {
            link: "https://en.wikipedia.org/wiki/Twelver_Shi%27ism",
        },
        "Ahmadiyya": {
            link: "https://en.wikipedia.org/wiki/Ahmadiyya",
        },
        "Yazidi": {
            name: "Yazidism",
            link: "https://en.wikipedia.org/wiki/Yazidism",
        },
        "Druze": {
            name: "Druze Faith",
            link: "https://en.wikipedia.org/wiki/Druze",
        },
        "Global": {
            link: "https://en.wikipedia.org/wiki/Adoption_of_the_Gregorian_calendar",
        },
        "Berber": {
            link: "https://en.wikipedia.org/wiki/Berbers",
        },
        "Bengali": {
            link: "https://en.wikipedia.org/wiki/Bengalis",
        },
        "Egyptian Jews": {
            link: "https://en.wikipedia.org/wiki/History_of_the_Jews_in_Egypt",
        },
        "Kurdistani Jews": {
            link: "https://en.wikipedia.org/wiki/History_of_the_Jews_in_Kurdistan",
        },
        "Ethiopian Jews": {
            link: "https://en.wikipedia.org/wiki/Beta_Israel",
        },
        "Indian Sufism": {
            link: "https://en.wikipedia.org/wiki/Sufism_in_India",
        },
        "Tunisian Jews": {
            link: "https://en.wikipedia.org/wiki/History_of_the_Jews_in_Tunisia"
        },
        "Ashkenazi Jews": {
            link: "https://en.wikipedia.org/wiki/Ashkenazi_Jews",
        },
        "Sephardi Jews": {
            link: "https://en.wikipedia.org/wiki/Sephardic_law_and_customs",
        },
    }
    return c2r[cl][att] == undefined ? cl : c2r[cl][att] 
}


for(c of Object.entries(calendars)){
    if(c[1].intercalary.type == "day"){
        interCal[c[0]] = c[1].months[c[1].intercalary.month].days
        yearObject[c[0]] = generateYear(c[1].startDay.year, c[0])
    }
    else if(c[1].intercalary.type == "month"){ //FIX!!
        yearObject[c[0]] = generateYear(c[1].startDay.year, c[0])
    }
    else if(c[1].intercalary.type == "thai"){
        yearObject[c[0]] = generateYear(c[1].startDay.year, c[0])
    }
    else if(c[1].intercalary.type == "none"){
        yearObject[c[0]] = generateYear(c[1].startDay.year, c[0])
    }
}

japanEraCount = 0
japaneseEraDates = ["30 July 1912", "25 December 1926", "8 January 1989", "1 May 2019"]
japaneseEras = ["Meiji", "Taishō", "Shōwa", "Heisei", "Reiwa"]
japaneseSubtract = [1867, 1911, 1925, 1988, 2018]

for(d = 0; d < 280000; d++){

    day = week[d % 7]
    mayaday = d + 1830738
    bakatun = Math.floor(mayaday / 144000)
    mayaday -= bakatun * 144000
    katun = Math.floor(mayaday / 7200)
    mayaday -= katun * 7200
    tun = Math.floor(mayaday / 360)
    mayaday -= tun * 360
    winal = Math.floor(mayaday / 20)
    mayaday -= winal * 20
    kin = mayaday

    obj = {
        Juliandate: d + 2415020.5,
        Harrisdate: d,
        Day: day,
        Mayan: `${bakatun}.${katun}.${tun}.${winal}.${kin}`,
    }

    for(l of Object.entries(calendars)){
        n = l[0]
        g = l[1]
        if(g.startDay.year <= g.bounds[1]){
            if(g.startDay.dayinmonth == 1 && g.startDay.monthcount == 0){
                yearObject[n] = generateYear(g.startDay.year, n)
            }
            if(n == "Japanese"){
                if(japanEraCount != 4 && japaneseEraDates[japanEraCount] == g.startDay.dayinmonth + " " + yearObject[n].months[g.startDay.monthcount].name + " " + g.startDay.year){
                    japanEraCount++
                }
                obj[n] = (g.startDay.dayinmonth + " " + yearObject[n].months[g.startDay.monthcount].name + " " + japaneseEras[japanEraCount] + " " + (g.startDay.year - japaneseSubtract[japanEraCount]))
            }
            else{
                obj[n] = (g.startDay.dayinmonth + " " + yearObject[n].months[g.startDay.monthcount].name + " " + g.startDay.year)
            }
    
            if(g.startDay.dayinmonth >= yearObject[n].months[g.startDay.monthcount].days){
                g.startDay.dayinmonth = 0
                if(g.startDay.monthcount == yearObject[n].months.length - 1){
                    g.startDay.monthcount = 0
                    g.startDay.year++
                }
                else{
                    g.startDay.monthcount++
                    if(yearObject[n].months[g.startDay.monthcount].days == 0){
                        while(yearObject[n].months[g.startDay.monthcount].days == 0){
                            g.startDay.monthcount++
                            if(g.startDay.monthcount >= yearObject[n].months.length - 1){
                                g.startDay.monthcount = 0
                                g.startDay.year++
                            }
                        }
                    }
                }
            }
            g.startDay.dayinmonth++
        }
    }
    alltimearray.push(obj)
}

function japanYear(){
    yearnum = {
        "Meiji": 45,
        "Taishō": 15,
        "Shōwa": 64,
        "Heisei": 31,
        "Reiwa": 6,
    }[japanera.value]
    japanyear.innerHTML = ""
    for(x = (japanera.value == "Meiji" ? 33 : 1); x <= yearnum; x++){
        japanyear.innerHTML += `<option value="${x}">${x}</option>`
    }
    japanMonth()
}

function japanMonth(){
    e = japanera.value
    y = japanyear.value
    japanmonth.innerHTML = ""
    numofmonths = 12
    startnum = 0
    if(y == 1){
        startnum = {
            "Taishō": 6,
            "Shōwa": 11,
            "Heisei": 0,
            "Reiwa": 4,
        }[e]
        numofmonths = 12
    }
    else if(e == "Meiji" && y == 45){
        numofmonths = 7
    }
    else if(e == "Shōwa" && y == 64){
        numofmonths = 1
    }
    else if(e == "Heisei" && y == 31){
        numofmonths = 4
    }
    for(x = startnum; x < numofmonths; x++){
        japanmonth.innerHTML += `<option value="${x+1}">${jmlist[x]}</option>`
    }
    japanDay()
}

function japanDay(){
    e = japanera.value
    y = japanyear.value
    m = japanmonth.value
    japanday.innerHTML = ""
    numofdays = 31
    startday = 1
    if(e == "Heisei" && y == 1 && m == 1){
        startday = 8
    }
    else if(e == "Shōwa" && y == 1 && m == 12){
        startday = 25
    }
    else if(e == "Taishō" && y == 1 && m == 7){
        startday = 30
    }
    else if(e == "Meiji" && y == 45 && m == 7){
        numofdays = 30
    }
    else if(e == "Taishō" && y == 45 && m == 12){
        numofdays = 25
    }
    else if(e == "Shōwa" && y == 45){
        numofdays = 7
    }
    else if(m == 2){
        numofdays = 28
        if(
            (e == "Reiwa" && y % 4 == 2) ||
            (e == "Heisei" && y % 4 == 0) ||
            (e == "Shōwa" && y % 4 == 3) ||
            (e == "Taishō" && y % 4 == 1) ||
            (e == "Meiji" && y % 4 == 1 && y != 33)
        ){
            numofdays = 29
        }
    }
    else if([4, 6, 9, 11].includes(m)){
        numofdays = 30
    }
    for(x = startday; x <= numofdays; x++){
        japanday.innerHTML += `<option value="${x}">${x}</option>`
    }
    convert()
}


function suntimes(lat, lng, tz, angl, relativehours) {
    if(relativehours == undefined) relativehours = 0
    dd = new Date(thatspecificday.Gregorian);
    radians = Math.PI / 180;
    degrees = 180 / Math.PI;
  
     var a = Math.floor((14 - (dd.getMonth() + 1)) / 12)
    var yy = dd.getFullYear() + 4800 - a;
    var mm = (dd.getMonth() + 1) + 12 * a - 3;
    j_day = dd.getDate() + Math.floor((153 * mm + 2)/5) + 365 * yy + Math.floor(yy/4) - Math.floor(yy/100) + Math.floor(yy/400) - 32045;
      var n_star = j_day - 2451545.0009 - lng / 360.0;
      var nn = Math.floor(n_star + 0.5);
      var solar_noon = 2451545.0009 - lng / 360.0 + nn;
      var M = 356.0470 + 0.9856002585 * nn;
      var C = 1.9148 * Math.sin( M * radians ) + 0.02 * Math.sin( 2 * M * radians ) + 0.0003 * Math.sin( 3 * M * radians );
      var L = ( M + 102.9372 + C + 180 ) % 360;
      var j_transit = solar_noon + 0.0053 * Math.sin( M * radians) - 0.0069 * Math.sin( 2 * L * radians );
      var D = Math.asin( Math.sin( L * radians ) * Math.sin( 23.45 * radians ) ) * degrees;
      var cos_omega = ( Math.sin(angl * radians) - Math.sin( lat * radians ) * Math.sin( D * radians ) ) / ( Math.cos( lat * radians ) * Math.cos( D * radians ) );
  
      // sun never rises
      if( cos_omega > 1)
        return [null, -1];
  
      // sun never sets
      if( cos_omega < -1 )
        return [-1, null];
  
      var omega = Math.acos( cos_omega ) * degrees;
      var j_set = j_transit + omega / 360.0;
      var j_rise = j_transit - omega / 360.0;
      var utc_time_set = 24 * (j_set - j_day) + 12;
      var utc_time_rise = 24 * (j_rise - j_day) + 12;
      var tz_offset = tz === undefined ? -1 * d.getTimezoneOffset() / 60 : tz;
      var local_rise = (utc_time_rise + +tz_offset) % 24;
      var local_set = (utc_time_set + +tz_offset) % 24;
      relativehour = (local_set - local_rise) / 12
      return [julianhourize(local_rise + relativehours * relativehour), julianhourize(local_set), julianhourize((local_rise + local_set) / 2)];
  }
  
  function julianhourize(juliandecimal){ //REWRITE
    hours = Math.floor(juliandecimal)
    minutes = Math.floor(juliandecimal % 1 * 60)
    if(minutes < 10) minutes = "0" + minutes
    return `${hours}:${minutes}`
  }

function locationChange(){
    city = loc.options[loc.selectedIndex].text
    locinfo = loc.value.split(";")
    sunrisesunset.innerHTML = "<span style='font-weight:700;color:black'>Sunrise/Sunset: </span>"
    sunrisesunset.innerHTML += `<a href="https://en.wikipedia.org/wiki/Sunrise" target="_blank">Sunrise</a>: ${suntimes(locinfo[0], locinfo[1], locinfo[2], -0.833)[0]} | `
    sunrisesunset.innerHTML += `<a href="https://en.wikipedia.org/wiki/Noon#Solar_noon" target="_blank">Solar noon</a>: ${suntimes(locinfo[0], locinfo[1], locinfo[2], -15)[2]} | `
    sunrisesunset.innerHTML += `<a href="https://en.wikipedia.org/wiki/Sunset" target="_blank">Sunset</a>: ${suntimes(locinfo[0], locinfo[1], locinfo[2], -0.833)[1]}`
    //
    zmanim.innerHTML = "<a style='font-weight:700;color:black' href='https://en.wikipedia.org/wiki/Zmanim' target='_blank'>Zmanim: </a>"
    zmanim.innerHTML += `<a class="hebrew" href="https://en.wikipedia.org/wiki/Zmanim#Daybreak" target="_blank">Daybreak</a>: ${suntimes(locinfo[0], locinfo[1], locinfo[2], -16.1)[0]} | `
    zmanim.innerHTML += `<a class="hebrew" href="https://en.wikipedia.org/wiki/Zmanim#Misheyakir target="_blank">Misheyakir</a>: ${suntimes(locinfo[0], locinfo[1], locinfo[2], -10.2)[0]} | `
    zmanim.innerHTML += `<a href="https://en.wikipedia.org/wiki/Zmanim#Sof_Zman_Kriyat_Shema" class="hebrew" target="_blank">Sof Zman Kriyat Shema</a>: ${suntimes(locinfo[0], locinfo[1], locinfo[2], -0.833, 3)[0]} | `
    zmanim.innerHTML += `<a href="https://en.wikipedia.org/wiki/Zmanim#Sof_Zman_Tefilah" class="hebrew" target="_blank">Sof Zman Tefilah</a>: ${suntimes(locinfo[0], locinfo[1], locinfo[2], -0.833, 4)[0]} | `
    zmanim.innerHTML += `<a href="https://en.wikipedia.org/wiki/Zmanim#Mincha_Gedolah" class="hebrew" target="_blank">Mincha Gedolah</a>: ${suntimes(locinfo[0], locinfo[1], locinfo[2], -0.833, 6.5)[0]} | `
    zmanim.innerHTML += `<a href="https://en.wikipedia.org/wiki/Zmanim#Mincha_Ketanah" class="hebrew" target="_blank">Mincha Ketanah</a>: ${suntimes(locinfo[0], locinfo[1], locinfo[2], -0.833, 9.5)[0]} | `
    zmanim.innerHTML += `<a href="https://en.wikipedia.org/wiki/Zmanim#Plag_Hamincha" class="hebrew" target="_blank">Plag Hamincha</a>: ${suntimes(locinfo[0], locinfo[1], locinfo[2], -0.833, 10.75)[0]}`
    if(thatspecificday.Day == "Saturday") zmanim.innerHTML += ` | <a href="https://en.wikipedia.org/wiki/Zmanim#Nightfall" class="hebrew" target="_blank">Shabbat end</a>: ${suntimes(locinfo[0], locinfo[1], locinfo[2], -8.5)[1]}`
    //
    prayertimes.innerHTML = "<a style='font-weight:700;color:black' target='_blank' href='https://en.wikipedia.org/wiki/Salah_times'>Salah Times</a>: "
    prayertimes.innerHTML += `<a class="islamic_tabular" href="https://en.wikipedia.org/wiki/Fajr" target="_blank">Fajr</a>: ${suntimes(locinfo[0], locinfo[1], locinfo[2], -15)[0]} | `
    prayertimes.innerHTML += `<a class="islamic_tabular" href="https://en.wikipedia.org/wiki/Dhuhr" target="_blank">Dhuhr</a>: ${suntimes(locinfo[0], locinfo[1], locinfo[2], -15)[2]} | `
    prayertimes.innerHTML += `<a class="islamic_tabular" href="https://en.wikipedia.org/wiki/Maghrib" target="_blank">Maghrib</a>: ${suntimes(locinfo[0], locinfo[1], locinfo[2], -0.833)[1]} | `
    prayertimes.innerHTML += `<a class="islamic_tabular" href="https://en.wikipedia.org/wiki/Isha" target="_blank">Isha</a>: ${suntimes(locinfo[0], locinfo[1], locinfo[2], -15)[1]}`

    //
    directions = []
    directions.push(Math.atan(Math.sin((35.235833 - locinfo[1]) * (Math.PI / 180)) / ((Math.cos(locinfo[0] * (Math.PI / 180)) * (Math.tan(31.778056 * (Math.PI / 180)))) - (Math.sin(locinfo[0] * Math.PI / 180) * Math.cos((35.235833 - locinfo[1]) * (Math.PI / 180))))) * 180 / Math.PI) //temple mount
    directions.push(Math.atan(Math.sin((35.273258 - locinfo[1]) * (Math.PI / 180)) / ((Math.cos(locinfo[0] * (Math.PI / 180)) * (Math.tan(32.200861 * (Math.PI / 180)))) - (Math.sin(locinfo[0] * Math.PI / 180) * Math.cos((35.273258 - locinfo[1]) * (Math.PI / 180))))) * 180 / Math.PI) //mt gerizim
    directions.push(Math.atan(Math.sin((39.8173 - locinfo[1]) * (Math.PI / 180)) / ((Math.cos(locinfo[0] * (Math.PI / 180)) * (Math.tan(21.4241  * (Math.PI / 180)))) - (Math.sin(locinfo[0] * Math.PI / 180) * Math.cos((39.8173 - locinfo[1]) * (Math.PI / 180))))) * 180 / Math.PI) //mecca
    directions.push(Math.atan(Math.sin((35.091944 - locinfo[1]) * (Math.PI / 180)) / ((Math.cos(locinfo[0] * (Math.PI / 180)) * (Math.tan(32.943611 * (Math.PI / 180)))) - (Math.sin(locinfo[0] * Math.PI / 180) * Math.cos((35.091944 - locinfo[1]) * (Math.PI / 180))))) * 180 / Math.PI) //qiblih



    directions = directions.map(ee => Math.round(ee * 10) / 10 + "°" /*+ "(" + ['N ↑', 'NE ↗', 'E →', 'SE ↘', 'S ↓', 'SW ↙', 'W ←', 'NW ↖'][Math.round(ee / 45) % 8] + ")" */)

    angles.innerHTML = "<a style='font-weight:700;color:black' href='https://en.wikipedia.org/wiki/Direction_of_prayer' target='_blank'>Directions of prayer</a>: "
    if(city != "Jerusalem") angles.innerHTML += "<a class='hebrew' href='https://en.wikipedia.org/wiki/Mizrah' target='_blank'>Judaism (Mizrah)</a>: " + directions[0]
    else angles.innerHTML += `<a class='hebrew' href='https://en.wikipedia.org/wiki/Mizrah' target='_blank'>Mizrah</a>: Face the <a href="https://en.wikipedia.org/wiki/Temple_Mount">Temple Mount</a>`
    angles.innerHTML += " | <a class='samaritan' href='https://en.wikipedia.org/wiki/Mount_Gerizim' target='_blank'>Samaritanism</a>: " + directions[1]
    if(city != "Mecca") angles.innerHTML += ` | <a class="islamic_tabular" href="https://en.wikipedia.org/wiki/Qibla" target="_blank">Islam (Qibla)</a>: ` + directions[2]
    else angles.innerHTML += ` | <a class="islamic_tabular" href="https://en.wikipedia.org/wiki/Qibla" target="_blank">Qibla</a>: Face the <a target="_blank" href="https://en.wikipedia.org/wiki/Kaaba">Kaaba</a>`
    if(city != "Akko") angles.innerHTML += " | <a class='baháí' href='https://en.wikipedia.org/wiki/Qiblih' target='_blank'>Bahá'í (Qiblih)</a>: " + directions[3]
    else angles.innerHTML += ` | <a class="baháí" href="https://en.wikipedia.org/wiki/Qiblih" target="_blank">Qiblih</a>: Face the <a target="_blank" href="https://en.wikipedia.org/wiki/Shrine_of_Bah%C3%A1%CA%BCu%27ll%C3%A1h">Shrine of Baháʼu'lláh</a>`
}


function reset(){
    //
    currentDay = ("" + new Date()).split(" ").slice(1, 4)
    calen = thecalendar.value
    abbreviations = {
        Jan: "January",
        Feb: "February",
        Mar: "March",
        Apr: "April",
        May: "May",
        Jun: "June",
        Jul: "July",
        Aug: "August",
        Sep: "September",
        Oct: "October",
        Nov: "November",
        Dec: "December",
    }
    currentDay[1] = +currentDay[1]
    currentDay[0] = abbreviations[currentDay[0]]
    currentDay = `${currentDay[1]} ${currentDay[0]} ${currentDay[2]}`
    thecurrentday = alltimearray.filter(x => x.Gregorian == currentDay)[0][calen].split(" ")
    
    if(calen == "Mayan"){
        selectblocktwo.style.display = "none"
        selectblockthree.style.display = "block"
        selectblockfour.style.display = "none"
        for(x = 0; x <= 19; x++){
            g = Array.from("𝋠𝋡𝋢𝋣𝋤𝋥𝋦𝋧𝋨𝋩𝋪𝋫𝋬𝋭𝋮𝋯𝋰𝋱𝋲𝋳")[x]
            maya2.innerHTML += `<option value="${x}">${g} ${x}</option>`
            if(x <= 17) maya3.innerHTML += `<option value="${x}">${g} ${x}</option>`
            maya4.innerHTML += `<option value="${x}">${g} ${x}</option>`
        }
        for(x = 0; x < 5; x++){
            document.getElementById("maya" + x).value = thecurrentday[0].split(".")[x]
        }
        findany.textContent = `Find any day between 12.15.0.0.0 and 13.12.19.17.19`
    }
    else if(calen == "Japanese"){
        selectblocktwo.style.display = "none"
        selectblockthree.style.display = "none"
        selectblockfour.style.display = "block"
        japanera.value = thecurrentday[2]

        //japanYear()

        japanyear.value = thecurrentday[3]
        //
        //japanMonth()

        japanmonth.value = jmlist.indexOf(thecurrentday[1]) + 1
        //
        //
        //japanDay()
        japanday.innerHTML = ""
        numofdays = 31
        if(thecurrentday[1] == "February"){
            numofdays == 28
            /* FIGURE IT OUT
            if(
                (e == "Reiwa" && y % 4 == 2) ||
                (e == "Heisei" && y % 4 == 0) ||
                (e == "Shōwa" && y % 4 == 3) ||
                (e == "Taishō" && y % 4 == 1) ||
                (e == "Meiji" && y % 4 == 1 && y != 33)
            ){
                numofdays = 29
            }*/
        }
        else if(["April", "June", "September", "November"].includes(thecurrentday[1])){
            numofdays = 30
        }
        for(x = 1; x <= numofdays; x++){
            japanday.innerHTML += `<option value="${x}">${x}</option>`
        }
        japanday.value = thecurrentday[0]
        findany.textContent = `Find any day between Meiji 33 and Reiwa 6`
    }
    else{
        selectblocktwo.style.display = "block"
        selectblockthree.style.display = "none"
        selectblockfour.style.display = "none"
        theyear.value = thecurrentday.slice(-1)[0]
        themonth.innerHTML = generateYear(theyear.value, calen).months.filter(y => y.days != 0).map(x => `<option value='${calendars[calen].months.map(z=>z.name).indexOf(x.name)}'>${x.name}</select>`).join("")
        themonth.value = 0
        themonth.value = generateYear(theyear.value, calen).months.map(x => x.name).indexOf(thecurrentday.slice(1, -1).join(" "))
        theday.innerHTML = ""
        for(x = 1; x <= generateYear(theyear.value, calen).months[themonth.value].days; x++){
            theday.innerHTML += `<option value="${x}">${x}</option>`
        }
        theday.value = thecurrentday[0]
        //
        findany.textContent = `Find any day between ${calendars[calen].bounds[0] + (["Gregorian", "Revised Julian", "Thai Solar", "Juche", "Minguo"].includes(calen) ? 0 : 1)} and ${calendars[calen].bounds[1] - 1} ` + calendars[calen].era
    }
    convert()
}

function openMonth(){
    answer.innerHTML = ""
    tm = themonth.value
    tmname = themonth.options[tm].textContent
    calen = thecalendar.value
    if(!isNaN(theyear.value) && theyear.value >= calendars[calen].bounds[0] && theyear.value <= calendars[calen].bounds[1]){
        themonth.innerHTML = generateYear(theyear.value, calen).months.map((x, ind) => x.days > 0 ? `<option value='${ind}'>${x.name}</option>`: ``).join("")
        lll = Array.from(themonth.options).map(g => g.textContent).indexOf(tmname)
        themonth.value = lll == -1 ? 0 : lll
        openDay()
    }
}

function openDay(){
    td = theday.value
    answer.innerHTML = ""
    calen = thecalendar.value
    theday.innerHTML = ""
    for(x = 1; x <= generateYear(theyear.value, calen).months[themonth.value].days; x++){
        theday.innerHTML += `<option value="${x}">${x}</option>`
    }
    if(td >= theday.options.length){
        theday.value = 1
    }
    else{
        theday.value = td
    }
    convert()
}

function openMaya(){
    answer.innerHTML = ""
    maya1.innerHTML = ""
    if(maya0.value == 12){
        for(x = 15; x <= 19; x++){
            maya1.innerHTML += `<option value="${x}">${Array.from("𝋠𝋡𝋢𝋣𝋤𝋥𝋦𝋧𝋨𝋩𝋪𝋫𝋬𝋭𝋮𝋯𝋰𝋱𝋲𝋳")[x]} ${x}</option>`
        }
    }
    else if(maya0.value == 13){
        for(x = 0; x <= 19; x++){
            maya1.innerHTML += `<option value="${x}">${Array.from("𝋠𝋡𝋢𝋣𝋤𝋥𝋦𝋧𝋨𝋩𝋪𝋫𝋬𝋭𝋮𝋯𝋰𝋱𝋲𝋳")[x]} ${x}</option>`
        }
    }
    else if(maya0.value == 14){
        for(x = 0; x <= 11; x++){
            maya1.innerHTML += `<option value="${x}">${Array.from("𝋠𝋡𝋢𝋣𝋤𝋥𝋦𝋧𝋨𝋩𝋪𝋫𝋬𝋭𝋮𝋯𝋰𝋱𝋲𝋳")[x]} ${x}</option>`
        }
    }
    convert()
}

function convert(){
    calen = thecalendar.value
    if(calen == "Mayan"){
        result = `${maya0.value}.${maya1.value}.${maya2.value}.${maya3.value}.${maya4.value}`
    }
    else if(calen == "Japanese"){
        result = `${japanday.value} ${japanmonth.options[japanmonth.selectedIndex].text} ${japanera.value} ${japanyear.value}`
    }
    else{
        q = generateYear(theyear.value, calen)
        themonth.style.color = "black"
        theday.style.color = "black"
        result = `${theday.value} ${themonth.options[themonth.selectedIndex].text} ${theyear.value}`
    }
    thatspecificday = alltimearray.filter(x => x[calen] == result)[0]
    answer.innerHTML = ""
    for(ourcalendar of Object.keys(thatspecificday).sort()){
        if(ourcalendar != calen){
            if(ourcalendar == "Day"){
                days = {
                    "Monday": {
                        es: "Lunes",
                        fr: "Lundi",
                        ru: "Понедельник",
                        zh: "星期一",
                        ar: "الاثنين",
                    },
                    "Tuesday": {
                        es: "Martes",
                        fr: "Mardi",
                        ru: "Вторник",
                        zh: "星期二",
                        ar: "الثلاثاء",
                    },
                    "Wednesday": {
                        es: "Miércoles",
                        fr: "Mercredi",
                        ru: "Среда",
                        zh: "星期三",
                        ar: "الأربعاء",
                    },
                    "Thursday": {
                        es: "Jueves",
                        fr: "Jeudi",
                        ru: "Четверг",
                        zh: "星期四",
                        ar: "الخميس",
                    },
                    "Friday": {
                        es: "Viernes",
                        fr: "Vendredi",
                        ru: "Пятница",
                        zh: "星期五",
                        ar: "الجمعة",
                    },
                    "Saturday": {
                        es: "Sábado",
                        fr: "Samedi",
                        ru: "Суббота",
                        zh: "星期六",
                        ar: "السبت",
                    },
                    "Sunday": {
                        es: "Domingo",
                        fr: "Dimanche",
                        ru: "Воскрешения",
                        zh: "星期天",
                        ar: "الأحد",
                    },
                }
                dOw = thatspecificday[ourcalendar]
                dayname.innerHTML = "<b>Day of the Week</b> " + dOw + ` | ${days[dOw].es} | ${days[dOw].fr} | ${days[dOw].ru} | ${days[dOw].zh} | ${days[dOw].ar}`
            }
            else if(ourcalendar == "Mayan"){
                answer.innerHTML += `<div class='cal mayan'><span>🌙 <a class="callink" target='_blank' href='https://en.wikipedia.org/wiki/Maya_calendar#Long_Count'>Mayan</a> ⬜<br>${thatspecificday[ourcalendar]}<br><span id="mayannumerals">${thatspecificday[ourcalendar].split(".").map(z => Array.from("𝋠𝋡𝋢𝋣𝋤𝋥𝋦𝋧𝋨𝋩𝋪𝋫𝋬𝋭𝋮𝋯𝋰𝋱𝋲𝋳")[z]).join(" ")}</span></span></div>`
            }
            else if(!ourcalendar.endsWith("date") && +thatspecificday[ourcalendar].split(" ").slice(-1)[0] > 0 && +thatspecificday[ourcalendar].split(" ").slice(-1)[0] <= calendars[ourcalendar].bounds[1]){
                zzz = ourcalendar == "Japanese" ? -2 : -1
                answer.innerHTML += 
                "<div class='cal " + 
                ourcalendar.toLowerCase().replace(/ /g, "_").replace(/\'/g, "").replace(/[\(\)]/g, "") + 
                "'><span>" + 
                {"Midnight": "🌕", "Sunrise": "☀️", "Sunset": "🌙"}[calendars[ourcalendar].dayStart] + " " + 
                "<a class='callink' target='_blank' href='" + 
                calendars[ourcalendar].link + 
                "'>" + 
                ourcalendar + 
                "</a> " + 
                {"Saturday": "🟥", "Sunday": "🟧", "Monday": "🟨", "N/A": "⬜", "Sunday/Monday": "🟧/🟨"}[calendars[ourcalendar].firstDay] + " " + 
                "<br>" + 
                thatspecificday[ourcalendar].split(" ")[0] + 
                " " + 
                (
                    calendars[ourcalendar].months.filter(x => x.name == thatspecificday[ourcalendar].split(" ").slice(1, zzz).join(" "))[0].link
                    ? 
                    `<a class='monthlink' href='${calendars[ourcalendar].months.filter(x => x.name == thatspecificday[ourcalendar].split(" ").slice(1, zzz).join(" "))[0].link}' target='_blank'>` + 
                    thatspecificday[ourcalendar].split(" ").slice(1, zzz).join(" ") +
                    "</a>"
                    :
                    thatspecificday[ourcalendar].split(" ").slice(1, zzz).join(" ")
                ) + 
                " " + 
                thatspecificday[ourcalendar].split(" ").slice(zzz).map(x => isNaN(x) ? `<a target='_blank' class='monthlink' href='https://en.wikipedia.org/wiki/` + x + "_era'>" + [x] + "</a>" : x).join(" ") + 
                " " + 
                calendars[ourcalendar].era + 
                "<br>" + 
                internationalize(thatspecificday[ourcalendar], ourcalendar) + 
                "</span></div>"
            }
        }
    }
    answer.innerHTML += 
    `<div class='cal time'>
    <div class="line">Days start at...</div>
    <div class="line">
    ☀️ (Sunrise) 🌙 (Sunset)
    </div>
    <div class="line">
    🌕 (Midnight)
    </div>
    </div>`
    answer.innerHTML += 
    `<div class='cal time'>
    <div class="line">Weeks start on...</div>
    <div class="line">
    🟥 (Saturday) 🟧 (Sunday)
    </div>
    <div class="line">
    🟨 (Monday) ⬜ (Not applicable)
    </div>
    </div>`
    answer.innerHTML += "<div class='cal harris'>By <a href='http://harrismowbray.com/' target='_blank'>Harris Mowbray</a><br><a href='calendar-changelog.html'>Updates</a><br><a href='mailto:harrismowbray@yahoo.com'>Email</a></div>"
    holidaycheck(thatspecificday)
    locationChange()
}


function holidaycheck(thatday){
    d = thatday.Day

    function makeJulianDate(factor){
        eY = thatday.Julian.split(" ").slice(-1)[0]
        eA = eY % 4
        eB = eY % 7
        eC = eY % 19
        eD = (19 * eC + 15) % 30
        eE = (2 * eA + 4 * eB - eD + 34) % 7
        finalE = eD + eE + 114
        finalE += factor
        if(finalE >= 185) easterDay = (finalE - 184) + " June"
        else if(finalE >= 154) easterDay = (finalE - 153) + " May"
        else if(finalE >= 124) easterDay = (finalE - 123 + " April")
        else if(finalE >= 93) easterDay = (finalE - 92 + " March")
        else{
            if(eY % 4 == 0) easterDay = (finalE - 65 + " February")
            else easterDay = (finalE - 66 + " February")
        }
        return easterDay
    }

    normalobservances = [
        {
            cal: "Gregorian",
            day: ["25 December", "5 January"],
            link: "https://en.wikipedia.org/wiki/Christmastide",
            name: "Christmastide",
        },
        {
            name: "Great Lent",
            link: "https://en.wikipedia.org/wiki/Great_Lent",
            cal: "Julian",
            day: [makeJulianDate(-48), makeJulianDate(-9)],
        },
        {
            name: "Lent",
            link: "https://en.wikipedia.org/wiki/Lent",
            cal: "Gregorian",
            day: [makeGregorianDate(-46), makeGregorianDate(-3)],
            sect: "Western Christianity",
        },
        {
            cal: "Bahá'í",
            day: ["1 ʻAláʼ", "19 ʻAláʼ"],
            link: "https://en.wikipedia.org/wiki/Nineteen-Day_Fast",
            name: "Nineteen-Day Fast",
        },
        {
            cal: "Bahá'í",
            day: ["13 Jalál", "5 Jamál"],
            link: "https://en.wikipedia.org/wiki/Ridv%C3%A1n",
            name: "Riḍván",
        },
        {
            cal: "Islamic Tabular",
            day: ["1 Ramadan", "30 Ramadan"],
            link: "https://en.wikipedia.org/wiki/Ramadan",
            name: "Ramadan",
        },
        {
            cal: "Hebrew",
            day: ["16 Nisan", "5 Sivan"], //iyar
            link: "https://en.wikipedia.org/wiki/Counting_of_the_Omer",
            name: "Counting of the Omer",
        },
        {
            cal: "Hebrew",
            day: ["17 Tammuz", "9 Av"],
            link: "https://en.wikipedia.org/wiki/The_Three_Weeks",
            name: "The Three Weeks",
        },
        {
            cal: "Hebrew",
            day: ["1 Av", "9 Av"],
            link: "https://en.wikipedia.org/wiki/The_Nine_Days",
            name: "The Nine Days",
        },
        {
            cal: "Hebrew",
            day: ["1 Tishrei", "10 Tishrei"],
            link: "https://en.wikipedia.org/wiki/Ten_Days_of_Repentance",
            name: "Ten Days of Repentance",
        },
        {
            cal: "Islamic Tabular",
            day: ["9 Rabiʽ al-Awwal", "27 Rabiʽ al-Awwal"],
            link: "https://en.wikipedia.org/wiki/Omar_Koshan",
            name: "Omar Koshan",
            sect: "Twelver Shia Islam",
        },
    ]

    natholidays = [
        {
            cal: "Gregorian",
            day: ["4 July"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(United_States)",
            country: "United States",
        },
        {
            cal: "Gregorian",
            day: ["14 June"],
            name: "Flag Day",
            link: "https://en.wikipedia.org/wiki/Flag_Day_(United_States)",
            country: "United States",
        },
        {
            cal: "Gregorian",
            day: ["28 November"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Albania)",
            country: "Albania",
        },
        {
            cal: "Gregorian",
            day: ["5 July"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Algeria)",
            country: "Algeria",
        },
        {
            cal: "Gregorian",
            day: ["11 November"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Angola)",
            country: "Angola",
        },
        {
            cal: "Gregorian",
            day: ["1 November"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Public_holidays_in_Antigua_and_Barbuda#Holidays",
            country: "Antigua and Barbuda",
        },
        {
            cal: "Gregorian",
            day: ["9 July"],
            name: "Argentina Independence Day",
            link: "https://en.wikipedia.org/wiki/Argentina_Independence_Day",
            country: "Argentina",
        },
        {
            cal: "Gregorian",
            day: ["20 June"],
            name: "Flag Day",
            link: "https://en.wikipedia.org/wiki/Flag_Day_(Argentina)",
            country: "Argentina",
        },
        {
            cal: "Gregorian",
            day: ["28 May"],
            name: "Republic Day",
            link: "https://en.wikipedia.org/wiki/Republic_Day_(Armenia)",
            country: "Armenia",
        },
        {
            cal: "Gregorian",
            day: ["21 September"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Armenia)",
            country: "Armenia",
        },
        {
            cal: "Gregorian",
            day: ["26 January"],
            name: "Australia Day",
            link: "https://en.wikipedia.org/wiki/Australia_Day",
            country: "Australia",
        },
        {
            cal: "Gregorian",
            day: ["28 May"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Azerbaijan,_28_May)",
            country: "Azerbaijan",
        },
        {
            cal: "Gregorian",
            day: ["9 November"],
            name: "State Flag Day",
            link: "https://en.wikipedia.org/wiki/State_Flag_Day_(Azerbaijan)",
            country: "Azerbaijan",
        },
        {
            cal: "Gregorian",
            day: ["18 October"],
            name: "Independence Restoration Day",
            link: "https://en.wikipedia.org/wiki/Day_of_Restoration_of_Independence_(Azerbaijan)",
            country: "Azerbaijan",
        },
        {
            cal: "Gregorian",
            day: ["15 August"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Bahrain)",
            country: "Bahrain",
        },
        {
            cal: "Gregorian",
            day: ["26 March"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Bangladesh)",
            country: "Bangladesh",
        },
        {
            cal: "Gregorian",
            day: ["16 December"],
            name: "Victory Day",
            link: "https://en.wikipedia.org/wiki/Victory_Day_(Bangladesh)",
            country: "Bangladesh",
        },
        {
            cal: "Gregorian",
            day: ["30 November"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Public_holidays_in_Barbados",
            country: "Barbados",
        },
        {
            cal: "Gregorian",
            day: ["3 July"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Belarus)",
            country: "Belarus",
        },
        {
            cal: "Gregorian",
            day: ["21 July"],
            name: "Belgian National Day",
            link: "https://en.wikipedia.org/wiki/Belgian_National_Day",
            country: "Belgium",
        },
        {
            cal: "Gregorian",
            day: ["10 September"],
            name: "National Day",
            link: "https://en.wikipedia.org/wiki/September_Celebrations",
            country: "Belize",
        },
        {
            cal: "Gregorian",
            day: ["21 September"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/September_Celebrations",
            country: "Belize",
        },
        {
            cal: "Gregorian",
            day: ["30 September"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Botswana)",
            country: "Botswana",
        },
        {
            cal: "Gregorian",
            day: ["7 September"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Brazil)",
            country: "Brazil",
        },
        {
            cal: "Gregorian",
            day: ["23 February"],
            name: "National Day",
            link: "https://en.wikipedia.org/wiki/National_Day_(Brunei)",
            country: "Brunei",
        },
        {
            cal: "Gregorian",
            day: ["3 March"],
            name: "Liberation Day",
            link: "https://en.wikipedia.org/wiki/Liberation_Day_(Bulgaria)",
            country: "Bulgaria",
        },
        {
            cal: "Gregorian",
            day: ["9 November"],
            name: "National Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_of_Cambodia",
            country: "Cambodia",
        },
        {
            cal: "Gregorian",
            day: ["20 May"],
            name: "National Day",
            link: "https://en.wikipedia.org/wiki/National_Day_(Cameroon)",
            country: "Cameroon",
        },
        {
            cal: "Gregorian",
            day: ["1 July"],
            name: "Canada Day",
            link: "https://en.wikipedia.org/wiki/Canada_Day",
            country: "Canada",
        },
        {
            cal: "Gregorian",
            day: ["15 February"],
            name: "Flag Day",
            link: "https://en.wikipedia.org/wiki/National_Flag_of_Canada_Day",
            country: "Canada",
        },
        {
            cal: "Gregorian",
            day: ["18 September", "19 September", (["Monday", "Friday"].includes(d) ? "17 September" : ""), (d == "Friday" ? "20 September" : "")],
            name: "Fiestas Patrias",
            link: "https://en.wikipedia.org/wiki/Fiestas_Patrias_(Chile)",
            country: "Chile",
        },
        {
            cal: "Gregorian",
            day: ["1 October"],
            name: "National Day",
            link: "https://en.wikipedia.org/wiki/National_Day_of_the_People%27s_Republic_of_China",
            country: "China",
        },
        {
            cal: "Gregorian",
            day: ["30 May"],
            name: "Statehood Day",
            link: "https://en.wikipedia.org/wiki/Statehood_Day_(Croatia)",
            country: "Croatia",
        },
        {
            cal: "Gregorian",
            day: ["1 October"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Cyprus)",
            country: "Cyprus",
        },
        {
            cal: "Gregorian",
            day: ["5 June"],
            name: "Constitution Day",
            link: "https://en.wikipedia.org/wiki/Constitution_Day_(Denmark)",
            country: "Denmark",
        },
        {
            cal: "Gregorian",
            day: ["27 June"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Djibouti)",
            country: "Djibouti",
        },
        {
            cal: "Gregorian",
            day: ["23 July"],
            name: "Revolution Day",
            link: "https://en.wikipedia.org/wiki/Revolution_Day_(Egypt)",
            country: "Egypt",
        },
        {
            cal: "Gregorian",
            day: ["24 May"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Eritrea)",
            country: "Eritrea",
        },
        {
            cal: "Gregorian",
            day: ["24 February"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Estonia)",
            country: "Estonia",
        },
        {
            cal: "Gregorian",
            day: ["14 June"],
            name: "Liberation Day",
            link: "https://en.wikipedia.org/wiki/Liberation_Day_(Falkland_Islands)",
            country: "Falkland Islands",
        },
        {
            cal: "Gregorian",
            day: ["28 July", "29 July"],
            name: "Ólavsøka",
            link: "https://en.wikipedia.org/wiki/%C3%93lavs%C3%B8ka",
            country: "Faroe Islands",
        },
        {
            cal: "Gregorian",
            day: ["10 October"],
            name: "Fiji Day",
            link: "https://en.wikipedia.org/wiki/Fiji_Week",
            country: "Fiji",
        },
        {
            cal: "Gregorian",
            day: ["6 December"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Finland)",
            country: "Finland",
        },
        {
            cal: "Gregorian",
            day: ["14 July"],
            name: "Bastille Day",
            link: "https://en.wikipedia.org/wiki/Bastille_Day",
            country: "France",
        },
        {
            cal: "Gregorian",
            day: ["29 June"],
            name: "Internal Autonomy Day",
            link: "https://en.wikipedia.org/wiki/Internal_Autonomy_Day",
            country: "French Polynesia",
        },
        {
            cal: "Gregorian",
            day: ["26 May"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Georgia)",
            country: "Georgia",
        },
        {
            cal: "Gregorian",
            day: ["3 October"],
            name: "German Unity Day",
            link: "https://en.wikipedia.org/wiki/German_Unity_Day",
            country: "Germany",
        },
        {
            cal: "Gregorian",
            day: ["6 March"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Ghana)",
            country: "Ghana",
        },
        {
            cal: "Gregorian",
            day: ["25 March"],
            name: "Celebration of the Greek Revolution",
            link: "https://en.wikipedia.org/wiki/Celebration_of_the_Greek_Revolution",
            country: "Greece",
        },
        {
            cal: "Gregorian",
            day: ["28 October"],
            name: "Ohi Day",
            link: "https://en.wikipedia.org/wiki/Ohi_Day",
            country: "Greece",
        },
        {
            cal: "Gregorian",
            day: ["21 June"],
            name: "Greenland National Day",
            link: "https://en.wikipedia.org/wiki/Greenland_National_Day",
            country: "Greenland",
        },
        {
            cal: "Gregorian",
            day: ["7 February"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Grenada)",
            country: "Grenada",
        },
        {
            cal: "Gregorian",
            day: ["15 September"],
            name: "Días Patrios",
            link: "https://en.wikipedia.org/wiki/D%C3%ADas_Patrios_(Guatemala)",
            country: "Guatemala",
        },
        {
            cal: "Gregorian",
            day: ["20 October"],
            name: "Días Patrios",
            link: "https://en.wikipedia.org/wiki/D%C3%ADas_Patrios_(Guatemala)",
            country: "Guatemala",
        },
        {
            cal: "Gregorian",
            day: ["23 February"],
            name: "Mashramani",
            link: "https://en.wikipedia.org/wiki/Mashramani",
            country: "Guyana",
        },
        {
            cal: "Gregorian",
            day: ["18 May"],
            name: "Flag Day",
            link: "https://en.wikipedia.org/wiki/Haitian_Flag_Day",
            country: "Haiti",
        },
        {
            cal: "Gregorian",
            day: ["17 June"],
            name: "Icelandic National Day",
            link: "https://en.wikipedia.org/wiki/Icelandic_National_Day",
            country: "Iceland",
        },
        {
            cal: "Gregorian",
            day: ["15 August"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(India)",
            country: "India",
        },
        {
            cal: "Gregorian",
            day: ["26 January"],
            name: "Republic Day",
            link: "https://en.wikipedia.org/wiki/Republic_Day_(India)",
            country: "India",
        },
        {
            cal: "Gregorian",
            day: ["2 October"],
            name: "Gandhi Jayanti",
            link: "https://en.wikipedia.org/wiki/Gandhi_Jayanti",
            country: "India",
        },
        {
            cal: "Gregorian",
            day: ["17 August"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Indonesia)",
            country: "Indonesia",
        },
        {
            cal: "Gregorian",
            day: [(!d.startsWith("S") ? "5 July": ""),(d == "Monday" ? "6 July": ""),(d == "Monday" ? "7 July": "")],
            name: "Tynwald Day",
            link: "https://en.wikipedia.org/wiki/Tynwald_Day",
            country: "Isle of Man",
        },
        {
            cal: "Hebrew",
            day: ["5 Iyar"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Israel)",
            country: "Israel",
        },
        {
            cal: "Gregorian",
            day: ["2 June"],
            name: "Festa della Repubblica",
            link: "https://en.wikipedia.org/wiki/Festa_della_Repubblica",
            country: "Italy",
        },
        {
            cal: "Gregorian",
            day: ["7 January"],
            name: "Tricolor Day",
            link: "https://en.wikipedia.org/wiki/Tricolour_Day",
            country: "Italy",
        },
        {
            cal: "Gregorian",
            day: ["11 February"],
            name: "National Foundation Day",
            link: "https://en.wikipedia.org/wiki/National_Foundation_Day_(Japan)",
            country: "Japan",
        },
        {
            cal: "Gregorian",
            day: ["6 August"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Jamaica)",
            country: "Jamaica",
        },
        {
            cal: "Gregorian",
            day: ["25 May"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Jordan)",
            country: "Jordan",
        },
        {
            cal: "Gregorian",
            day: ["16 December"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Kazakhstan)",
            country: "Kazakhstan",
        },
        {
            cal: "Gregorian",
            day: ["12 December"],
            name: "Jamhuri Day",
            link: "https://en.wikipedia.org/wiki/Jamhuri_Day",
            country: "Kenya",
        },
        {
            cal: "Gregorian",
            day: ["31 August"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Kyrgyzstan)",
            country: "Kyrgyzstan",
        },
        {
            cal: "Gregorian",
            day: ["18 November"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Latvia)",
            country: "Latvia",
        },
        {
            cal: "Gregorian",
            day: ["4 May"],
            name: "Independence Restoration Day",
            link: "https://en.wikipedia.org/wiki/Day_of_the_Restoration_of_Latvian_Independence",
            country: "Latvia",
        },
        {
            cal: "Gregorian",
            day: ["22 November"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Lebanese_Independence_Day",
            country: "Lebanon",
        },
        {
            cal: "Gregorian",
            day: ["16 February"],
            name: "Lithuanian State Reestablishment Day",
            link: "https://en.wikipedia.org/wiki/Act_of_Independence_of_Lithuania#Legacy",
            country: "Lithuania",
        },
        {
            cal: "Gregorian",
            day: ["23 June"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Grand_Duke%27s_Official_Birthday",
            country: "Luxembourg",
        },
        {
            cal: "Gregorian",
            day: ["31 August"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Malaysia)",
            country: "Malaysia",
        },
        {
            cal: "Gregorian",
            day: ["16 September"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Malaysia_Day",
            country: "Malaysia",
        },
        {
            cal: "Gregorian",
            day: ["21 September"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Malta)",
            country: "Malta",
        },
        {
            cal: "Gregorian",
            day: ["31 March"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Freedom_Day_(Malta)",
            country: "Malta",
        },
        {
            cal: "Gregorian",
            day: ["7 June"],
            name: "Sette Giugno",
            link: "https://en.wikipedia.org/wiki/Sette_Giugno",
            country: "Malta",
        },
        {
            cal: "Gregorian",
            day: ["8 September"],
            name: "Victory Day",
            link: "https://en.wikipedia.org/wiki/Victory_Day_(Malta)",
            country: "Malta",
        },
        {
            cal: "Gregorian",
            day: ["24 February"],
            name: "Flag Day",
            link: "https://en.wikipedia.org/wiki/Flag_Day_in_Mexico",
            country: "Mexico",
        },
        {
            cal: "Gregorian",
            day: ["27 August"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_of_the_Republic_of_Moldova",
            country: "Moldova",
        },
        {
            cal: "Gregorian",
            day: ["10 July"],
            name: "State Flag Day",
            link: "https://en.wikipedia.org/wiki/Mongolian_State_Flag_Day",
            country: "Mongolia",
        },
        {
            cal: "Gregorian",
            day: ["29 December"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Mongolia)",
            country: "Mongolia",
        },
        {
            cal: "Gregorian",
            day: ["4 January"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Myanmar)",
            country: "Myanmar",
        },
        {
            cal: "Gregorian",
            day: ["26 October"],
            name: "Angam Day",
            link: "https://en.wikipedia.org/wiki/Angam_Day",
            country: "Nauru",
        },
        {
            cal: "Gregorian",
            day: ["5 May"],
            name: "Liberation Day",
            link: "https://en.wikipedia.org/wiki/Liberation_Day_(Netherlands)",
            country: "Netherlands",
        },
        {
            cal: "Gregorian",
            day: ["27 April"],
            day: [d != "Sunday" ? "27 April" : "", d == "Saturday" ? "26 April" : ""],
            name: "King's Day",
            link: "https://en.wikipedia.org/wiki/Koningsdag",
            country: "Netherlands",
        },
        {
            cal: "Gregorian",
            day: ["6 February"],
            name: "Waitangi Day",
            link: "https://en.wikipedia.org/wiki/Waitangi_Day",
            country: "New Zealand",
        },
        {
            cal: "Gregorian",
            day: ["18 December"],
            name: "Republic Day",
            link: "https://en.wikipedia.org/wiki/Republic_Day_(Niger)",
            country: "Niger",
        },
        {
            cal: "Gregorian",
            day: ["1 October"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Nigeria)",
            country: "Nigeria",
        },
        {
            cal: "Gregorian",
            day: ["2 August"],
            name: "Republic Day",
            link: "https://en.wikipedia.org/wiki/Republic_Day_(North_Macedonia)",
            country: "North Macedonia",
        },
        {
            cal: "Gregorian",
            day: ["8 September"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(North_Macedonia)",
            country: "North Macedonia",
        },
        {
            cal: "Gregorian",
            day: ["17 May"],
            name: "Constitution Day",
            link: "https://en.wikipedia.org/wiki/Constitution_Day_(Norway)",
            country: "Norway",
        },
        {
            cal: "Gregorian",
            day: ["18 November"],
            name: "National Day",
            link: "https://en.wikipedia.org/wiki/National_Day_of_Oman",
            country: "Oman",
        },
        {
            cal: "Gregorian",
            day: ["23 March"],
            name: "Pakistan Day",
            link: "https://en.wikipedia.org/wiki/Pakistan_Day",
            country: "Pakistan",
        },
        {
            cal: "Gregorian",
            day: ["14 August"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Pakistan)",
            country: "Pakistan",
        },
        {
            cal: "Gregorian",
            day: ["28 July", "29 July"],
            name: "Fiestas Patrias",
            link: "https://en.wikipedia.org/wiki/Fiestas_Patrias_(Peru)",
            country: "Peru",
        },
        {
            cal: "Gregorian",
            day: ["12 June"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Philippines)",
            country: "Philippines",
        },
        {
            cal: "Gregorian",
            day: ["11 November"],
            name: "National Independence Day",
            link: "https://en.wikipedia.org/wiki/National_Independence_Day_(Poland)",
            country: "Poland",
        },
        {
            cal: "Gregorian",
            day: ["3 May"],
            name: "3 May Constitution Day",
            link: "https://en.wikipedia.org/wiki/3_May_Constitution_Day",
            country: "Poland",
        },
        {
            cal: "Gregorian",
            day: ["2 May"],
            name: "National Flag Day",
            link: "https://en.wikipedia.org/wiki/Polish_National_Flag_Day",
            country: "Poland",
        },
        {
            cal: "Gregorian",
            day: ["10 June"],
            name: "Portugal Day",
            link: "https://en.wikipedia.org/wiki/Portugal_Day",
            country: "Portugal",
        },
        {
            cal: "Gregorian",
            day: ["18 December"],
            name: "National Day",
            link: "https://en.wikipedia.org/wiki/National_Day_(Qatar)",
            country: "Qatar",
        },
        {
            cal: "Gregorian",
            day: ["1 December"],
            name: "Great Union Day",
            link: "https://en.wikipedia.org/wiki/Great_Union_Day",
            country: "Romania",
        },
        {
            cal: "Gregorian",
            day: ["23 September"],
            name: "Saudi National Day",
            link: "https://en.wikipedia.org/wiki/Saudi_National_Day",
            country: "Saudi Arabia",
        },
        {
            cal: "Gregorian",
            day: ["11 March"],
            name: "Flag Day",
            link: "https://en.wikipedia.org/wiki/Saudi_Flag_Day",
            country: "Saudi Arabia",
        },
        {
            cal: "Gregorian",
            day: ["23 September"],
            name: "Statehood Day",
            link: "https://en.wikipedia.org/wiki/Statehood_Day_(Serbia)",
            country: "Serbia",
        },
        {
            cal: "Gregorian",
            day: ["15 September"],
            name: "Day of Serb Unity, Freedom and the National Flag",
            link: "https://en.wikipedia.org/wiki/Day_of_Serb_Unity,_Freedom_and_the_National_Flag",
            country: "Serbia",
        },
        {
            cal: "Gregorian",
            day: ["9 August"],
            name: "National Day",
            link: "https://en.wikipedia.org/wiki/National_Day_(Singapore)",
            country: "Singapore",
        },
        {
            cal: "Gregorian",
            day: ["25 June"],
            name: "Statehood Day",
            link: "https://en.wikipedia.org/wiki/Statehood_Day_(Slovenia)",
            country: "Slovenia",
        },
        {
            cal: "Gregorian",
            day: ["26 December"],
            name: "Independence and Unity Day",
            link: "https://en.wikipedia.org/wiki/Independence_and_Unity_Day_(Slovenia)",
            country: "Slovenia",
        },
        {
            cal: "Gregorian",
            day: ["1 July"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Somalia)",
            country: "Somalia",
        },
        {
            cal: "Gregorian",
            day: ["27 April"],
            name: "Freedom Day",
            link: "https://en.wikipedia.org/wiki/Freedom_Day_(South_Africa)",
            country: "South Africa",
        },
        {
            cal: "Gregorian",
            day: ["15 August"],
            name: "National Liberation Day",
            link: "https://en.wikipedia.org/wiki/National_Liberation_Day_of_Korea",
            country: "South Korea",
        },
        {
            cal: "Gregorian",
            day: ["3 October"],
            name: "National Foundation Day",
            link: "https://en.wikipedia.org/wiki/National_Foundation_Day_(Korea)",
            country: "South Korea",
        },
        {
            cal: "Gregorian",
            day: ["12 October"],
            name: "National Day of Spain",
            link: "https://en.wikipedia.org/wiki/National_Day_of_Spain",
            country: "Spain",
        },
        {
            cal: "Gregorian",
            day: ["4 February"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Sri_Lanka)",
            country: "Sri Lanka",
        },
        {
            cal: "Gregorian",
            day: ["6 June"],
            name: "National Day of Sweden",
            link: "https://en.wikipedia.org/wiki/National_Day_of_Sweden",
            country: "Sweden",
        },
        {
            cal: "Gregorian",
            day: ["1 August"],
            name: "Swiss National Day",
            link: "https://en.wikipedia.org/wiki/Swiss_National_Day",
            country: "Switzerland",
        },
        {
            cal: "Gregorian",
            day: ["10 October"],
            name: "National Day",
            link: "https://en.wikipedia.org/wiki/National_Day_of_the_Republic_of_China",
            country: "Taiwan",
        },
        {
            cal: "Gregorian",
            day: ["9 September"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Tajikistan)",
            country: "Tajikistan",
        },
        {
            cal: "Gregorian",
            day: ["28 November"],
            name: "Proclamation of Independence Day",
            link: "https://en.wikipedia.org/wiki/Proclamation_of_Independence_Day_(East_Timor)",
            country: "Timor-Leste",
        },
        {
            cal: "Gregorian",
            day: ["29 October"],
            name: "Republic Day",
            link: "https://en.wikipedia.org/wiki/Republic_Day_(Turkey)",
            country: "Turkey",
        },
        {
            cal: "Gregorian",
            day: ["27 September"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Turkmenistan)",
            country: "Turkmenistan",
        },
        {
            cal: "Gregorian",
            day: ["18 May"],
            name: "State Flag and Constitution Day",
            link: "https://en.wikipedia.org/wiki/State_Flag_and_Constitution_Day_(Turkmenistan)",
            country: "Turkmenistan",
        },
        {
            cal: "Gregorian",
            day: ["9 October"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Uganda)",
            country: "Uganda",
        },
        {
            cal: "Gregorian",
            day: ["24 August"],
            name: "Independence Day of Ukraine",
            link: "https://en.wikipedia.org/wiki/Independence_Day_of_Ukraine",
            country: "Ukraine",
        },
        {
            cal: "Gregorian",
            day: ["15 July"],
            name: "Statehood Day",
            link: "https://en.wikipedia.org/wiki/Statehood_Day_(Ukraine)",
            country: "Ukraine",
        },
        {
            cal: "Gregorian",
            day: ["23 August"],
            name: "Day of the National Flag",
            link: "https://en.wikipedia.org/wiki/Day_of_the_National_Flag_(Ukraine)",
            country: "Ukraine",
        },
        {
            cal: "Gregorian",
            day: ["2 December"],
            name: "National Day",
            link: "https://en.wikipedia.org/wiki/National_Day_(United_Arab_Emirates)",
            country: "United Arab Emirates",
        },
        {
            cal: "Gregorian",
            day: ["3 November"],
            name: "Flag Day",
            link: "https://en.wikipedia.org/wiki/Flag_Day_(United_Arab_Emirates)",
            country: "United Arab Emirates",
        },
        {
            cal: "Gregorian",
            day: ["1 September"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Uzbekistan)",
            country: "Uzbekistan",
        },
        {
            cal: "Gregorian",
            day: ["5 July"],
            name: "Independence Day",
            link: "https://en.wikipedia.org/wiki/Independence_Day_(Venezuela)",
            country: "Venezuela",
        },
        {
            cal: "Gregorian",
            day: ["2 September"],
            name: "National_ Day",
            link: "https://en.wikipedia.org/wiki/National_Day_(Vietnam)",
            country: "Vietnam",
        },
    ]

    normalholidays = [
        {
            sect: "Global",
            cal: "Gregorian",
            day: ["31 December"],
            link: "https://en.wikipedia.org/wiki/New_Year%27s_Eve",
            name: "New Year's Eve",
        },
        {
            sect: "Global",
            cal: "Gregorian",
            day: ["1 January"],
            link: "https://en.wikipedia.org/wiki/New_Year%27s_Day",
            name: "New Year's Day",
        },
        {
            sect: "Global",
            cal: "Gregorian",
            day: ["29 February"],
            link: "https://www.youtube.com/watch?v=S5vaVNvcgiI",
            name: "Leap Day",
        },
        {
            cal: "Gregorian",
            day: ["6 January"],
            link: "https://en.wikipedia.org/wiki/Epiphany_(holiday)",
            name: "Epiphany",
        },
        {
            sect: "Armenian Christianity",
            name: "Christmas",
            cal: "Gregorian",
            day: ["6 January"],
            link: "https://en.wikipedia.org/wiki/Observance_of_Christmas_by_country#Armenia",
        },
        {
            name: "Candlemas",
            cal: "Gregorian",
            day: ["2 February"],
            link: "https://en.wikipedia.org/wiki/Candlemas",
        },
        {
            cal: "Gregorian",
            day: ["24 June"],
            link: "https://en.wikipedia.org/wiki/Nativity_of_John_the_Baptist",
            name: "Nativity of John the Baptist",
        },
        {
            cal: "Gregorian",
            day: ["15 August"],
            link: "https://en.wikipedia.org/wiki/Assumption_of_Mary",
            name: "Assumption of Mary",
        },
        {
            cal: "Gregorian",
            day: ["14 September"],
            link: "https://en.wikipedia.org/wiki/Feast_of_the_Cross",
            name: "Feast of the Cross",
        },
        {
            cal: "Gregorian",
            day: ["1 November"],
            link: "https://en.wikipedia.org/wiki/All_Saints%27_Day",
            name: "All Saints' Day",
        },
        {
            cal: "Gregorian",
            day: ["8 December"],
            link: "https://en.wikipedia.org/wiki/Feast_of_the_Immaculate_Conception",
            name: "Feast of the Immaculate Conception",
        },
        {
            cal: "Gregorian",
            day: ["25 December"],
            link: "https://en.wikipedia.org/wiki/Christmas",
            name: "Christmas",
        },
        {
            cal: "Bahá'í",
            day: ["1 Bahá"],
            link: "https://en.wikipedia.org/wiki/Bah%C3%A1%CA%BC%C3%AD_Naw-R%C3%BAz",
            name: "Naw-Rúz",
        },
        {
            cal: "Bahá'í",
            day: ["13 Jalál"],
            link: "https://en.wikipedia.org/wiki/Ridv%C3%A1n#Festival",
            name: "1st of Riḍván",
        },
        {
            cal: "Bahá'í",
            day: ["2 Jamál"],
            link: "https://en.wikipedia.org/wiki/Ridv%C3%A1n#Festival",
            name: "9th of Riḍván",
        },
        {
            cal: "Bahá'í",
            day: ["5 Jamál"],
            link: "https://en.wikipedia.org/wiki/Ridv%C3%A1n#Festival",
            name: "12th of Riḍván",
        },
        {
            cal: "Bahá'í",
            day: ["8 ʻAẓamat"],
            link: "https://en.wikipedia.org/wiki/B%C3%A1b#Declaration_to_Mull%C3%A1_Husayn",
            name: "Declaration of the Báb",
        },
        {
            cal: "Bahá'í",
            day: ["13 ʻAẓamat"],
            link: "https://www.bpl.org/blogs/post/the-origins-and-practices-of-holidays-ascension-of-bahaullah-ascension-of-jesus/",
            name: "Ascension of Baháʼu'lláh",
        },
        {
            cal: "Bahá'í",
            day: ["17 Raḥmat"],
            link: "https://en.wikipedia.org/wiki/Execution_of_the_B%C3%A1b",
            name: "Martyrdom of the Báb",
        },
        {
            cal: "Bahá'í",
            day: ["4 Qawl"],
            link: "https://en.wikipedia.org/wiki/Day_of_the_Covenant_(Bah%C3%A1%CA%BC%C3%AD)",
            name: "Day of the Covenant",
        },
        {
            cal: "Bahá'í",
            day: ["6 Qawl"],
            link: "https://en.wikipedia.org/wiki/%CA%BBAbdu%27l-Bah%C3%A1#Death_and_funeral",
            name: "Ascension of ʻAbdu'l-Bahá",
        },
        {
            cal: "Bahá'í",
            day: [thatday["Bahá'í"] != undefined ? ["10 Qudrat", "18 ʻIlm", "7 ʻIlm", "6 Qudrat", "14 ʻIlm", "4 ʻIlm", "4 Qudrat", "11 ʻIlm", "1 ʻIlm", "19 ʻIlm", "8 ʻIlm", "7 Qudrat", "15 ʻIlm", "5 ʻIlm", "5 Qudrat", "14 ʻIlm", "2 ʻIlm", "2 Qudrat", "10 ʻIlm", "10 Qudrat", "17 ʻIlm", "6 ʻIlm", "6 Qudrat", "15 ʻIlm", "4 ʻIlm", "4 Qudrat", "12 ʻIlm", "1 ʻIlm", "19 ʻIlm", "8 ʻIlm", "8 Qudrat", "16 ʻIlm", "5 ʻIlm", "5 Qudrat", "14 ʻIlm", "3 ʻIlm", "2 Qudrat", "10 ʻIlm", "9 Qudrat", "18 ʻIlm", "6 ʻIlm", "6 Qudrat", "15 ʻIlm", "4 ʻIlm", "4 Qudrat", "11 ʻIlm", "19 Mas͟híyyat"][thatday["Bahá'í"].split(" ").slice(-1)[0] - 172] : "none"],
            link: "https://en.wikipedia.org/wiki/%CA%BBAbdu%27l-Bah%C3%A1#Death_and_funeral",
            name: "Birth of the Báb",
        },
        {
            cal: "Bahá'í",
            day: [thatday["Bahá'í"] != undefined ? ["11 Qudrat", "19 ʻIlm", "8 ʻIlm", "7 Qudrat", "15 ʻIlm", "5 ʻIlm", "5 Qudrat", "12 ʻIlm", "2 ʻIlm", "1 Qudrat", "9 ʻIlm", "8 Qudrat", "16 ʻIlm", "6 ʻIlm", "6 Qudrat", "15 ʻIlm", "3 ʻIlm", "3 Qudrat", "11 ʻIlm", "11 Qudrat", "18 ʻIlm", "7 ʻIlm", "7 Qudrat", "16 ʻIlm", "5 ʻIlm", "5 Qudrat", "13 ʻIlm", "2 ʻIlm", "1 Qudrat", "9 ʻIlm", "9 Qudrat", "17 ʻIlm", "6 ʻIlm", "6 Qudrat", "15 ʻIlm", "4 ʻIlm", "3 Qudrat", "11 ʻIlm", "10 Qudrat", "19 ʻIlm", "7 ʻIlm", "7 Qudrat", "16 ʻIlm", "5 ʻIlm", "5 Qudrat", "12 ʻIlm", "1 ʻIlm"][thatday["Bahá'í"].split(" ").slice(-1)[0] - 172] : "none"],
            link: "https://en.wikipedia.org/wiki/%CA%BBAbdu%27l-Bah%C3%A1#Death_and_funeral",
            name: "Birth of Baháʼu'lláh",
        },
        {
            cal: "Fasli (Zoroastrian)",
            name: "Khordad Sal",
            day: ["6 Farvadin"],
            link: "https://en.wikipedia.org/wiki/Khordad_Sal",
        },
        {
            cal: "Fasli (Zoroastrian)",
            name: "Zartosht No-Diso",
            day: ["11 Dae"],
            link: "https://en.wikipedia.org/wiki/Zartosht_No-Diso",
        },
        {
            cal: "Qadimi",
            name: "Zartosht No-Diso",
            day: ["11 Dae"],
            link: "https://en.wikipedia.org/wiki/Zartosht_No-Diso",
        },
        {
            cal: "Qadimi",
            name: "Khordad Sal",
            day: ["6 Farvadin"],
            link: "https://en.wikipedia.org/wiki/Khordad_Sal",
        },
        {
            cal: "Shahanshahi",
            name: "Khordad Sal",
            day: ["6 Farvadin"],
            link: "https://en.wikipedia.org/wiki/Khordad_Sal",
        },
        {
            cal: "Shahanshahi",
            name: "Zartosht No-Diso",
            day: ["11 Dae"],
            link: "https://en.wikipedia.org/wiki/Zartosht_No-Diso",
        },
        {
            cal: "Hebrew",
            name: "Rosh Hashanah",
            day: ["1 Tishrei", "2 Tishrei"],
            link: "https://en.wikipedia.org/wiki/Rosh_Hashanah",
        },
        {
            cal: "Hebrew",
            name: "Chag HaBanot",
            day: ["1 Tevet"],
            link: "https://en.wikipedia.org/wiki/Girls%27_Day_(Judaism)",
            sect: "Tunisian Jews",
        },
        {
            cal: "Hebrew",
            name: "Rosh Hashanah Lemaasar Behema",
            day: ["1 Elul"],
            link: "https://en.wikipedia.org/wiki/Rosh_HaShanah_LeMaasar_Behema",
        },
        {
            cal: "Hebrew",
            name: "Yom Kippur",
            day: ["10 Tishrei"],
            link: "https://en.wikipedia.org/wiki/Yom_Kippur",
        },
        {
            cal: "Hebrew",
            name: "Shemini Atzeret",
            day: ["22 Tishrei"],
            link: "https://en.wikipedia.org/wiki/Shemini_Atzeret",
        },
        {
            name: "Simchat Torah:outside Israel",
            cal: "Hebrew",
            day: ["23 Tishrei"],
            link: "https://en.wikipedia.org/wiki/Simchat_Torah",  
        },
        {
            name: "Pesach",
            cal: "Hebrew",
            day: ["15 Nisan", "16 Nisan","17 Nisan", "18 Nisan","19 Nisan", "20 Nisan","21 Nisan"],
            link: "https://en.wikipedia.org/wiki/Passover",
        },
        {
            name: "Mimouna",
            cal: "Hebrew",
            day: ["22 Nisan"],
            link: "https://en.wikipedia.org/wiki/Mimouna",
        },
        {
            name: "Mimouna:outside Israel",
            cal: "Hebrew",
            day: ["23 Nisan"],
            link: "https://en.wikipedia.org/wiki/Mimouna",
        },
        {
            name: "Pesach:outside Israel",
            cal: "Hebrew",
            day: ["22 Nisan"],
            link: "https://en.wikipedia.org/wiki/Passover",
        },
        {
            name: "Sukkot",
            cal: "Hebrew",
            day: ["15 Tishrei", "16 Tishrei","17 Tishrei", "18 Tishrei","19 Tishrei", "20 Tishrei","21 Tishrei"],
            link: "https://en.wikipedia.org/wiki/Sukkot",
        },
        {
            name: "Seharane",
            cal: "Hebrew",
            day: ["19 Tishrei", "20 Tishrei"],
            link: "https://archive.jewishagency.org/holidays-and-memorial-days/content/23863/",
            sect: "Kurdistani Jews",
        },
        {
            name: "Sukkot:outside Israel",
            cal: "Hebrew",
            day: ["22 Tishrei"],
            link: "https://en.wikipedia.org/wiki/Sukkot",
        },
        {
            name: "Tu B'Av",
            cal: "Hebrew",
            day: ["15 Av"],
            link: "https://en.wikipedia.org/wiki/Tu_B%27Av",
        },
        {
            name: "Tisha B'Av",
            cal: "Hebrew",
            day: [d != "Saturday" ? "9 Av" : "", d == "Sunday" ? "10 Av" : ""],
            link: "https://en.wikipedia.org/wiki/Tisha_B%27Av",
        },
        {
            cal: "Hebrew",
            name: "Purim",
            day: ["14 Adar"],
            link: "https://en.wikipedia.org/wiki/Purim",
        },
        {
            cal: "Hebrew",
            name: "Shushan Purim",
            day: ["15 Adar"],
            link: "https://en.wikipedia.org/wiki/Purim#Shushan_Purim",
        },
        {
            cal: "Hebrew",
            name: "Purim Meshulash",
            day: [(d == "Sunday" ? "16 Adar" : "")],
            link: "https://en.wikipedia.org/wiki/Purim#Purim_Meshulash",
        },
        {
            cal: "Hebrew",
            name: "Purim",
            day: ["14 Adar II"],
            link: "https://en.wikipedia.org/wiki/Purim",
        },
        {
            cal: "Hebrew",
            name: "Shushan Purim",
            day: ["15 Adar II"],
            link: "https://en.wikipedia.org/wiki/Purim#Shushan_Purim",
        },
        {
            cal: "Hebrew",
            name: "Purim Meshulash",
            day: [(d == "Sunday" ? "16 Adar II" : "")],
            link: "https://en.wikipedia.org/wiki/Purim#Purim_Meshulash",
        },
        {
            cal: "Hebrew",
            name: "Purim Katan",
            day: ["14 Adar I"],
            link: "https://en.wikipedia.org/wiki/Purim#Purim_Katan",
        },
        {
            cal: "Hebrew",
            name: "Shushan Purim Katan",
            day: ["15 Adar I"],
            link: "https://en.wikipedia.org/wiki/Purim#Purim_Katan",
        },
        {
            cal: "Hebrew",
            name: "Tu BiShvat",
            day: ["15 Shvat"],
            link: "https://en.wikipedia.org/wiki/Tu_BiShvat",
        },
        {
            cal: "Hebrew",
            name: "Sigd",
            day: ["29 Cheshvan"],
            link: "https://en.wikipedia.org/wiki/Sigd",
            sect: "Ethiopian Jews",
        },
        {
            cal: "Hebrew",
            name: "Lag BaOmer",
            day: ["18 Iyar"],
            link: "https://en.wikipedia.org/wiki/Lag_BaOmer",
        },
        {
            cal: "Hebrew",
            name: "Shavuot",
            day: ["6 Sivan"],
            link: "https://en.wikipedia.org/wiki/Shavuot",
        },
        {
            cal: "Hebrew",
            name: "Leil Selichot",
            day: ["20 Elul", "21 Elul", "22 Elul", "23 Elul", "24 Elul", "25 Elul"],
            link: "https://en.wikipedia.org/wiki/Selichot#Selichot_of_the_High_Holidays",
            theDay: "Saturday",
            sect: "Ashkenazi Jews",
        },
        {
            cal: "Hebrew",
            name: "Leil Selichot",
            day: ["2 Elul"],
            link: "https://en.wikipedia.org/wiki/Selichot#Selichot_of_the_High_Holidays",
            sect: "Sephardi Jews",
        },
        {
            cal: "Julian",
            name: "Yazidi New Year",
            day: ["1 April", "2 April", "3 April", "4 April", "5 April", "6 April", "7 April"],
            link: "https://en.wikipedia.org/wiki/Yazidi_New_Year",
            theDay: "Wednesday",
            sect: "Yazidi",
            overrideCal: "yazidi",
        },
        {
            cal: "Julian",
            name: "Cejna Cemayê",
            day: ["24 September", "25 September", "26 September", "27 September", "28 September", "29 September", "30 September"],
            link: "https://en.wikipedia.org/wiki/Cejna_Cemay%C3%AA",
            sect: "Yazidi",
            overrideCal: "yazidi",
        },
        {
            cal: "Julian",
            name: "Feast of Ezid",
            day: ["1 December", "2 December", "3 December", "4 December", "5 December", "6 December", "7 December"],
            link: "https://en.wikipedia.org/wiki/Feast_of_Ezid",
            theDay: "Friday",
            sect: "Yazidi",
            overrideCal: "yazidi",
        },
        {
            cal: "Gregorian",
            name: "Promised Messiah Day",
            day: ["23 March"],
            link: "https://en.wikipedia.org/wiki/Promised_Messiah_Day",
            sect: "Ahmadiyya",
            overrideCal: "islamic_tabular",
        },
        {
            cal: "Gregorian",
            name: "Ziyarat al-Nabi Shu'ayb",
            day: ["25 April", "26 April", "27 April", "28 April"],
            link: "https://en.wikipedia.org/wiki/Ziyara_(Druze)",
            sect: "Druze",
            overrideCal: "druze",
        },
        {
            cal: "Gregorian",
            name: "Caliphate Day",
            day: ["27 May"],
            link: "https://en.wikipedia.org/wiki/Caliphate_Day",
            sect: "Ahmadiyya",
            overrideCal: "islamic_tabular",
        },
        {
            cal: "Gregorian",
            name: "Promised Reformer Day",
            day: ["20 February"],
            link: "https://en.wikipedia.org/wiki/Promised_Reformer_Day",
            sect: "Ahmadiyya",
            overrideCal: "islamic_tabular",
        },
        {
            cal: "Hebrew",
            name: "Hanukkah",
            day: thatday.Hebrew != undefined ? ["25 Kislev", "26 Kislev", "27 Kislev", "28 Kislev", "29 Kislev", "1 Tevet", "2 Tevet", (hebrewCons.charAt(thatday.Hebrew.split(" ").slice(-1)[0] - 5660) == "d" ? "3 Tevet" : "30 Kislev")] : ["none"],
            link: "https://en.wikipedia.org/wiki/Hanukkah",
        },
        {
            cal: "Hebrew",
            name: "Fast of Esther",
            day: [(d == "Thursday" ? "11 Adar II" : ""), (d != "Saturday" ? "13 Adar II" : "")],
            link: "https://en.wikipedia.org/wiki/Fast_of_Esther",
        },
        {
            cal: "Hebrew",
            name: "Fast of Esther",
            day: [(d == "Thursday" ? "11 Adar" : ""), (d != "Saturday" ? "13 Adar" : "")],
            link: "https://en.wikipedia.org/wiki/Fast_of_Esther",
        },
        {
            cal: "Hebrew",
            name: "Fast of Gedalia",
            day: [(d != "Saturday" ? "3 Tishrei": ""),(d == "Sunday" ? "4 Tishrei": "")],
            link: "https://en.wikipedia.org/wiki/Fast_of_Gedalia",
        },
        {
            cal: "Hebrew",
            name: "Fast of the Firstborn",
            day: [(d != "Saturday" ? "14 Nisan" : ""), (d == "Thursday" ? "12 Nisan" : "")],
            link: "https://en.wikipedia.org/wiki/Fast_of_the_Firstborn",
        },
        {
            cal: "Hebrew",
            name: "Seventeenth of Tammuz",
            link: "https://en.wikipedia.org/wiki/Seventeenth_of_Tammuz",
            day: [(d != "Saturday" ? "17 Tammuz" : ""), (d == "Sunday" ? "18 Tammuz" : "")],
        },
        {
            name: "Tenth of Tevet",
            cal: "Hebrew",
            link: "https://en.wikipedia.org/wiki/Tenth_of_Tevet",
            day: "10 Tevet",
        },
        {
            cal: "Solar Hijri",
            name: "Tirgan",
            day: ["13 Tir"],
            link: "https://en.wikipedia.org/wiki/Tirgan",
        },
        {
            cal: "Solar Hijri",
            name: "Yaldā Night",
            day: ["30 Azar"],
            link: "https://en.wikipedia.org/wiki/Yald%C4%81_Night",
        },
        {
            cal: "Solar Hijri",
            name: "Nowruz",
            day: ["1 Farvardin"],
            link: "https://en.wikipedia.org/wiki/Nowruz",
        },
        {
            cal: "Solar Hijri",
            name: "Sizdah Be-dar",
            day: ["13 Farvardin"],
            link: "https://en.wikipedia.org/wiki/Sizdah_Be-dar",
        },
        {
            cal: "Solar Hijri",
            name: "Khorram Rooz",
            day: ["1 Dey"],
            link: "https://en.wikipedia.org/wiki/Khorram_rooz",
        },
        {
            cal: "Solar Hijri",
            name: "Amordadegan",
            day: ["7 Mordad"],
            link: "https://en.wikipedia.org/wiki/Amordadegan_festival",
        },
        {
            cal: "Solar Hijri",
            name: "Cyrus the Great Day",
            day: ["7 Aban"],
            link: "https://en.wikipedia.org/wiki/Cyrus_the_Great_Day",
        },
        {
            cal: "Islamic Tabular",
            name: "Day of Arafah",
            day: ["9 Dhu al-Hijjah"],
            link: "https://en.wikipedia.org/wiki/Day_of_Arafah",
        },
        {
            cal: "Islamic Tabular",
            name: "Jumu'atul-Wida",
            day: ["30 Ramadan", "29 Ramadan", "28 Ramadan", "27 Ramadan", "26 Ramadan", "25 Ramadan", "24 Ramadan"],
            link: "https://en.wikipedia.org/wiki/Jumu%27atul-Wida",
            theDay: "Friday",
        },
        {
            cal: "Islamic Tabular",
            name: "Eid al-Adha",
            day: ["10 Dhu al-Hijjah"],
            link: "https://en.wikipedia.org/wiki/Eid_al-Adha",
        },
        {
            sect: "Shia Islam",
            cal: "Islamic Tabular",
            name: "Eid al-Ghadir",
            day: ["18 Dhu al-Hijjah"],
            link: "https://en.wikipedia.org/wiki/Eid_al-Ghadir",
        },
        {
            sect: "Twelver Shia Islam",
            cal: "Islamic Tabular",
            name: "Chup Tazia",
            day: ["8 Rabiʽ al-Awwal"],
            link: "https://en.wikipedia.org/wiki/Chup_Tazia",
        },
        {
            sect: "Shia Islam",
            cal: "Islamic Tabular",
            name: "Fatimiyya",
            day: ["13 Jumada al-Awwal", "14 Jumada al-Awwal", "15 Jumada al-Awwal", "3 Jumada al-Thani", "4 Jumada al-Thani", "5 Jumada al-Thani"],
            link: "https://en.wikipedia.org/wiki/Fatimiyya",
        },
        {
            sect: "Sunni Islam",
            cal: "Islamic Tabular",
            name: "Mawlid",
            day: ["12 Rabiʽ al-Awwal"],
            link: "https://en.wikipedia.org/wiki/Mawlid",
        },
        {
            sect: "Indian Sufism",
            cal: "Islamic Tabular",
            name: "Juloos-e-Ghausiya",
            day: ["11 Rabiʽ al-Thani"],
            link: "https://en.wikipedia.org/wiki/Juloos-e-Ghausiya",
        },
        {
            sect: "Shia Islam",
            cal: "Islamic Tabular",
            name: "Tasu'a",
            day: ["9 Muharram"],
            link: "https://en.wikipedia.org/wiki/Tasu%27a",
        },
        {
            sect: "Shia Islam",
            cal: "Islamic Tabular",
            name: "Mawlid",
            day: ["17 Rabiʽ al-Awwal"],
            link: "https://en.wikipedia.org/wiki/Mawlid",
        },
        {
            cal: "Islamic Tabular",
            name: "Eid al-Fitr",
            day: ["1 Shawwal"],
            link: "https://en.wikipedia.org/wiki/Eid_al-Fitr",
        },
        {
            cal: "Islamic Tabular",
            name: "Ashura",
            day: ["10 Muharram"],
            link: "https://en.wikipedia.org/wiki/Ashura",
        },
        {
            cal: "Islamic Tabular",
            name: "Islamic New Year",
            link: "https://en.wikipedia.org/wiki/Islamic_New_Year",
            day: ["1 Muharram"],
        },
        {
            cal: "Islamic Tabular",
            name: "Shab-e-Barat",
            link: "https://en.wikipedia.org/wiki/Shab-e-Barat",
            day: ["15 Sha'ban"],
        },
        {
            cal: "Julian",
            name: "Old New Year",
            link: "https://en.wikipedia.org/wiki/Old_New_Year",
            day: ["1 January"]
        },
        {
            cal: "Hebrew",
            name: "Seder El-Tawhid",
            link: "https://www.hsje.org/library/Seder-ElTawhid.html",
            day: ["1 Nisan"],
            sect: "Egyptian Jews",
        },
        {
            sect: "Armenian Christianity",
            cal: "Julian",
            name: "Christmas:in Israel and Jordan",
            link: "https://en.wikipedia.org/wiki/Christmas",
            day: ["6 January"],
        },
        {
            cal: "Julian",
            name: "Epiphany",
            day: ["January 6"],
            link: "https://en.wikipedia.org/wiki/Epiphany_(holiday)",
        },
        {
            cal: "Julian",
            name: "Feast of the Cross",
            link: "https://en.wikipedia.org/wiki/Feast_of_the_Cross",
            day: ["14 September"],
        },
        {
            cal: "Julian",
            name: "Christmas",
            day: ["25 December"],
            link: "https://en.wikipedia.org/wiki/Christmas",
        },
        {
            cal: "Nanakshahi",
            name: "Sikh New Year",
            link: "https://en.wikipedia.org/wiki/Punjabi_Culture_Day",
            day: ["1 Chet"],
        },
        {
            name: "Hola Mohalla",
            cal: "Nanakshahi",
            link: "https://en.wikipedia.org/wiki/Hola_Mohalla",
            day: ["2 Chet", "3 Chet", "4 Chet"],
        },
        {
            name: "Vaisakhi",
            cal: "Nanakshahi",
            link: "https://en.wikipedia.org/wiki/Vaisakhi",
            day: ["1 Vaisakh", "2 Vaisakh"],
        },
        {
            cal: "Mandaean",
            name: "Dehwa Daimana",
            day: ["1 Hiṭia"],
            link: "https://en.wikipedia.org/wiki/Dehwa_Daimana"
        },
        {
            cal: "Mandaean",
            name: "Ead Fel",
            day: ["1 Taura"],
            link: "https://en.wikipedia.org/wiki/Mandaean_calendar#Festivals",
        },
        {
            cal: "Mandaean",
            name: "Dehwa Daimana",
            day: ["1 Taura"],
            link: "https://en.wikipedia.org/wiki/Dehwa_Daimana"
        },
        {
            cal: "Mandaean",
            name: "Abu al-Haris",
            day: ["1 Sarṭana"],
            link: "https://en.wikipedia.org/wiki/Abu_al-Haris",
        },
        {
            cal: "Mandaean",
            name: "Kanshiy u-Zahly",
            day: ["30 Gadia"],
            link: "https://en.wikipedia.org/wiki/Dehwa_Rabba#Kanshiy_u-Zahly",
        },
        {
            cal: "Mandaean",
            name: "Dehwa Rabba",
            day: ["1 Daula"],
            link: "https://en.wikipedia.org/wiki/Dehwa_Rabba",
        },
        {
            cal: "Mandaean",
            name: "Feast of the Great Shishlam",
            day: ["6 Daula", "7 Daula"],
            link: "https://en.wikipedia.org/wiki/Feast_of_the_Great_Shishlam",
        },
        {
            cal: "Mandaean",
            name: "Parwanaya",
            day: ["1 Parwanaya", "2 Parwanaya", "3 Parwanaya", "4 Parwanaya", "5 Parwanaya"],
            link: "https://en.wikipedia.org/wiki/Parwanaya",
        },
        {
            cal: "Mandaean",
            name: "Dehwa Hanina",
            day: ["18 Taura"],
            link: "https://en.wikipedia.org/wiki/Dehwa_Hanina",
        },
        {
            name: "Pohela Boishakh",
            day: ["1 Boishakh"],
            cal: "Bengali",
            link: "https://en.wikipedia.org/wiki/Pohela_Boishakh",
        },
        {
            link: "https://en.wikipedia.org/wiki/Satu_Suro",
            day: ["1 Sura"],
            cal: "Javanese",
            name: "Satu Suro",
        },
        {
            link: "https://en.wikipedia.org/wiki/Yennayer",
            day: ["31 Dujembir"],
            cal: "Berber",
            name: "Yennayer",
        },
        {
            link: "https://en.wikipedia.org/wiki/Nayrouz",
            day: ["1 Thout"],
            cal: "Coptic",
            name: "Nayrouz",
        },
        {
            link: "https://en.wikipedia.org/wiki/Enkutatash",
            name: "Enkutatash",
            cal: "Ethiopian",
            day: ["1 Meskerem"],
        },
        {
            link: "https://en.wikipedia.org/wiki/Ethiopian_Christmas",
            name: "Ethiopian Christmas",
            cal: "Ethiopian",
            day: ["29 Tahsas"],
        },
        {
            link: "https://en.wikipedia.org/wiki/Easter#Eastern_Christianity_2",
            name: "Easter",
            cal: "Julian",
            day: [makeJulianDate(0)],
        },
        {
            link: "https://en.wikipedia.org/wiki/Palm_Sunday",
            name: "Palm Sunday",
            cal: "Julian",
            day: [makeJulianDate(-7)],
        },
        {
            link: "https://en.wikipedia.org/wiki/Maundy_Thursday",
            name: "Maundy Thursday",
            cal: "Julian",
            day: [makeJulianDate(-3)],
        },
        {
            link: "https://en.wikipedia.org/wiki/Paschal_Triduum",
            name: "Paschal Triduum",
            cal: "Gregorian",
            day: [makeGregorianDate(-2), makeGregorianDate(-1), makeGregorianDate(0)],
        },
        {
            link: "https://en.wikipedia.org/wiki/Allhallowtide",
            name: "Allhallowtide",
            cal: "Gregorian",
            day: ["31 October", "1 November", "2 November"],
        },
        {
            link: "https://en.wikipedia.org/wiki/Feast_of_the_Ascension",
            name: "Feast of the Ascension",
            cal: "Julian",
            day: [makeJulianDate(39)],
        },
        {
            link: "https://en.wikipedia.org/wiki/Pentecost",
            name: "Pentecost",
            cal: "Julian",
            day: [makeJulianDate(49)],
        },
        {
            link: "https://en.wikipedia.org/wiki/Clean_Monday",
            name: "Pentecost",
            cal: "Julian",
            day: [makeJulianDate(-48)],
        },
        {
            link: "https://en.wikipedia.org/wiki/Easter",
            name: "Easter",
            cal: "Gregorian",
            day: [makeGregorianDate(0)],
        },
        {
            link: "https://en.wikipedia.org/wiki/Ash_Wednesday",
            name: "Ash Wednesday",
            cal: "Gregorian",
            day: [makeGregorianDate(-46)],
        },
        {
            link: "https://en.wikipedia.org/wiki/Shrove_Monday",
            name: "Shrove Monday",
            cal: "Gregorian",
            day: [makeGregorianDate(-48)],
        },
        {
            link: "https://en.wikipedia.org/wiki/Shrove_Tuesday",
            name: "Shrove Tuesday",
            cal: "Gregorian",
            day: [makeGregorianDate(-47)],
        },
        {
            link: "https://en.wikipedia.org/wiki/Feast_of_the_Ascension",
            name: "Feast of the Ascension",
            cal: "Gregorian",
            day: [makeGregorianDate(39)],
        },
        {
            link: "https://en.wikipedia.org/wiki/Pentecost",
            name: "Pentecost",
            cal: "Gregorian",
            day: [makeGregorianDate(49)],
        },
        {
            link: "https://en.wikipedia.org/wiki/Palm_Sunday",
            name: "Palm Sunday",
            cal: "Gregorian",
            day: [makeGregorianDate(-7)],
        },
        {
            link: "https://en.wikipedia.org/wiki/Maundy_Thursday",
            name: "Maundy Thursday",
            cal: "Gregorian",
            day: [makeGregorianDate(-3)],
        },
        {
            link: "https://en.wikipedia.org/wiki/Trinity_Sunday",
            name: "Trinity Sunday",
            cal: "Gregorian",
            day: [makeGregorianDate(56)],
        },
        {
            link: "https://en.wikipedia.org/wiki/Septuagesima",
            name: "Septuagesima",
            cal: "Gregorian",
            day: [makeGregorianDate(-63)],
        },
        {
            link: "https://en.wikipedia.org/wiki/Sexagesima",
            name: "Sexagesima",
            cal: "Gregorian",
            day: [makeGregorianDate(-56)],
        },
        {
            link: "https://en.wikipedia.org/wiki/Quinquagesima",
            name: "Quinquagesima",
            cal: "Gregorian",
            day: [makeGregorianDate(-49)],
        },
    ]



    //then western
    function makeGregorianDate(factor){
        eY = thatday.Gregorian.split(" ").slice(-1)[0]
        eA = eY % 19
        eB = Math.floor(eY / 100)
        eC = eY % 100
        eD = Math.floor(eB / 4)
        eE = eB % 4
        eG = Math.floor((8 * eB + 13) / 25)
        eH = (19 * eA + eB - eD - eG + 15) % 30
        eI = Math.floor(eC / 4)
        eK = eC % 4
        eL = (32 + 2 * eE + 2 * eI - eH - eK) % 7
        eM = Math.floor((eA + 11 * eH + 19 * eL) / 433)
        eN = Math.floor((eH + eL - 7 * eM + 90) / 25)
        eP = (eH + eL - 7 * eM + 33 * eN + 19) % 32
        newv = eH + eL - 7 * eM + 33 * eN + 19
        if(newv <= 127) newv += 33
        newv += factor
        if(newv >= 222) easterDay = (newv - 221) + " June"
        else if(newv >= 191) easterDay = (newv - 190) + " May"
        else if(newv >= 161) easterDay = (newv - 160) + " April"
        else if(newv <= 160 && newv >= 130) easterDay = (newv - 129) + " March"
        else if(newv <= 129){
            if(eY % 4 == 0 && !(eY % 100 == 0 && eY % 400 != 0)){
                if(newv <= 100){
                    easterDay = (newv - 69) + " January"
                }
                else{
                    easterDay = (newv - 100) + " February"
                }
            }
            else{
                if(newv <= 100){
                    easterDay = (newv - 70) + " January"
                }
                else{
                    easterDay = (newv - 101) + " February"
                }            
            }
        }
        return easterDay
    }

    //OKAY WE ARE READY NOW

    holidays.innerHTML = ""
    for(n of normalholidays){
        caal = n.sect == undefined ? n.cal : n.sect
        calclass = n.overrideCal != undefined ? n.overrideCal : n.cal.replace(/\'/, "").replace(/ /g, "_").replace("(", "").replace(")", "").toLowerCase()
        if(thatday[n.cal] != undefined){
            tt = thatday[n.cal].split(" ").slice(0, -1).join(" ")
            if(tt != undefined && n.day.includes(tt) && (n.theDay == undefined || n.theDay == thatday.Day)){
                holidays.innerHTML += `<h2 class="${calclass}"><a style="color:inherit;text-decoration:dotted underline" href="${religionize(caal, "link")}" target="_blank">${religionize(caal, "name")}</a>: <a target="_blank" style="color:inherit;font-weight:700;text-decoration:underline" href="${n.link}">${n.name.split(":")[0]}</a>${n.name.includes(":") ? ` <a target="_blank" class='sect' href="${{"outside Israel": "https://en.wikipedia.org/wiki/Yom_tov_sheni_shel_galuyot", "Sunni": "https://en.wikipedia.org/wiki/Sunni_Islam", "Shia": "https://en.wikipedia.org/wiki/Shia_Islam", "Armenian": "https://en.wikipedia.org/wiki/Armenian_Apostolic_Church", "in Israel and Jordan": "https://en.wikipedia.org/wiki/Armenian_Patriarchate_of_Jerusalem", "Chol HaMoed in Israel": "", "Chol HaMoed": "",}[n.name.split(":")[1]]}">(${n.name.split(":")[1]})</a>` : ``}</h2>`
            }
        }
    }
    if(thatday.Harrisdate % 10227 == 9228) holidays.innerHTML += `<h2 class="hebrew"><a style="color:inherit;text-decoration:dotted underline" href="${religionize("hebrew", "link")}" target="_blank">${religionize("hebrew", "name")}</a>: <a target="_blank" style="color:inherit;font-weight:700;text-decoration:underline" href="https://en.wikipedia.org/wiki/Birkat_Hachama">Birkat Hachama</a>`
    if(holidays.innerHTML != "") holidays.innerHTML = "<h3>Religious/Cultural Holidays</h3>" + holidays.innerHTML
//
    nationalholidays.innerHTML = ""
    for(n of natholidays){
        if(thatday[n.cal] != undefined){
            tt = thatday[n.cal].split(" ").slice(0, -1).join(" ")
            if(tt != undefined && n.day.includes(tt) && (n.theDay == undefined || n.theDay == thatday.Day)){
                nationalholidays.innerHTML += `<h2><a href="${n.link}" target="_blank">${n.name}${n.name.includes(n.country.slice(0,3)) ? `` : ` (${n.country})`}</a> ${emoji[n.country]}</h2>`
            }
        }
    }
    if(nationalholidays.innerHTML != "") nationalholidays.innerHTML = "<h3>National Holidays</h3>" + nationalholidays.innerHTML

    //

    observances.innerHTML = ""
    for(n of normalobservances){
        caal = n.sect == undefined ? n.cal : n.sect
        if(thatday[n.cal] != undefined){
            tt = thatday[n.cal].split(" ")
            myday = tt[0]
            mymonth = tt.slice(1, -1).join("")
            myyear = tt.slice(-1)[0]
            monthlist = getYear(myyear,n.cal).map(u => u.split(":")[0])
            if(
            (mymonth == n.day[0].split(" ").slice(1).join("") && +myday >= +n.day[0].split(" ")[0] && !(mymonth == n.day[1].split(" ").slice(1).join("") && +myday >= +n.day[1].split(" ")[0])) ||
            (mymonth == n.day[1].split(" ").slice(1).join("") && +myday <= +n.day[1].split(" ")[0]) ||
            (monthlist.indexOf(mymonth) > monthlist.indexOf(n.day[0].split(" ")[1]) && monthlist.indexOf(mymonth) < monthlist.indexOf(n.day[1].split(" ").slice(1).join("")))
            ){
                observances.innerHTML += `<h2 class="${n.cal.replace(/\'/, "").replace(/ /g, "_").toLowerCase()}"><a style="color:inherit;text-decoration:dotted underline" href="${religionize(caal,"link")}" target="_blank">${religionize(caal, "name")}</a>: <a target="_blank" style="color:inherit;font-weight:700;text-decoration:underline" href="${n.link}">${n.name.split(":")[0]}</a>${n.name.includes(":") ? ` <a target="_blank" class='sect' href="${{"outside Israel": "https://en.wikipedia.org/wiki/Yom_tov_sheni_shel_galuyot", "Sunni": "https://en.wikipedia.org/wiki/Sunni_Islam", "Shia": "https://en.wikipedia.org/wiki/Shia_Islam", "Armenian": "https://en.wikipedia.org/wiki/Armenian_Apostolic_Church", "Armenian Patriarchate of Jerusalem": "https://en.wikipedia.org/wiki/Armenian_Patriarchate_of_Jerusalem",}[n.name.split(":")[1]]}">(${n.name.split(":")[1]})</a>` : ``}</h2>`
            }
        }
    }
    if(observances.innerHTML != "") observances.innerHTML = "<h3>Observances</h3>" + observances.innerHTML


    //ADD MONTHLY AND WEEKLY CODE
    monthly.innerHTML = ""
    if(thatday.Hebrew.startsWith("1 ") || thatday.Hebrew.startsWith("30 ")){
        monthly.innerHTML += `<h2 class="hebrew"><a style="color:inherit;text-decoration:dotted underline" href="https://en.wikipedia.org/wiki/Judaism" target="_blank">Judaism</a>: <a target="_blank" style="color:inherit;font-weight:700;text-decoration:underline" href="https://en.wikipedia.org/wiki/Rosh_Chodesh">Rosh Chodesh</a></h2>`
    }
    if(thatday["Bahá'í"].startsWith("1 ")){
        monthly.innerHTML += `<h2 class="baháí"><a style="color:inherit;text-decoration:dotted underline" href="https://en.wikipedia.org/wiki/Bah%C3%A1%CA%BC%C3%AD_Faith target="_blank">Bahá'í Faith</a>: <a target="_blank" style="color:inherit;font-weight:700;text-decoration:underline" href="https://en.wikipedia.org/wiki/Nineteen_Day_Feast">Nineteen Day Feast</a></h2>`
    }
    if(monthly.innerHTML != "") monthly.innerHTML = "<h3>Monthly celebrations</h3>" + monthly.innerHTML

    //
    weekly.innerHTML = ""
    if(thatday.Day == "Friday"){
        weekly.innerHTML += `<h2 class="islamic_tabular"><a style="color:inherit;text-decoration:dotted underline" href="https://en.wikipedia.org/wiki/Islam" target="_blank">Islam</a>: <a target="_blank" style="color:inherit;font-weight:700;text-decoration:underline" href="https://en.wikipedia.org/wiki/Friday_prayer">Friday prayer</a></h2>`
        weekly.innerHTML += `<h2 class="baháí"><a style="color:inherit;text-decoration:dotted underline" href="https://en.wikipedia.org/wiki/Bah%C3%A1%CA%BC%C3%AD_Faith target="_blank">Bahá'í Faith</a>: <a target="_blank" style="color:inherit;font-weight:700;text-decoration:underline" href="https://en.wikipedia.org/wiki/Sabbath#Bah%C3%A1%CA%BC%C3%AD_Faith">Day of rest</a></h2>`
    }
    else if(thatday.Day == "Saturday"){
        specialshabbat = ""
        thehebrewday = thatday.Hebrew.split(" ").slice(0, -1).join(" ")
        hyear = thatday.Hebrew.split(" ").pop()
        if(["1 Nisan", "29 Adar", "28 Adar", "27 Adar", "26 Adar", "25 Adar", "24 Adar", "29 Adar II", "28 Adar II", "27 Adar II", "26 Adar II", "25 Adar II", "24 Adar II"].includes(thehebrewday)) specialshabbat = `<small>(<a target='_blank'  style="color:inherit;font-weight:700;text-decoration:underline" href='https://en.wikipedia.org/wiki/Special_Shabbat#Shabbat_HaChodesh'>HaChodesh</a>)</small>`
        else if(["23 Adar", "22 Adar", "21 Adar", "20 Adar", "19 Adar", "18 Adar", "17 Adar", "23 Adar II", "22 Adar II", "21 Adar II", "20 Adar II", "19 Adar II", "18 Adar II", "17 Adar II"].includes(thehebrewday)) specialshabbat = `<small>(<a target='_blank'  style="color:inherit;font-weight:700;text-decoration:underline" href='https://en.wikipedia.org/wiki/Special_Shabbat#Shabbat_Parah'>Parah</a>)</small>`
        else if(["8 Nisan", "9 Nisan", "10 Nisan", "11 Nisan", "12 Nisan", "13 Nisan", "14 Nisan"].includes(thehebrewday)) specialshabbat = `<small>(<a target='_blank'  style="color:inherit;font-weight:700;text-decoration:underline" href='https://en.wikipedia.org/wiki/Special_Shabbat#Shabbat_HaGadol'>HaGadol</a>)</small>`
        else if(["3 Tishrei", "4 Tishrei", "5 Tishrei", "6 Tishrei", "7 Tishrei", "8 Tishrei"].includes(thehebrewday)) specialshabbat = `<small>(<a target='_blank'  style="color:inherit;font-weight:700;text-decoration:underline" href='https://en.wikipedia.org/wiki/Special_Shabbat#Shabbat_Shuvah_%E2%80%93_Return'>Shuva</a>)</small>`
        else if(["4 Av", "5 Av", "6 Av", "7 Av", "8 Av", "9 Av"].includes(thehebrewday)) specialshabbat = `<small>(<a target='_blank'  style="color:inherit;font-weight:700;text-decoration:underline" href='https://en.wikipedia.org/wiki/Special_Shabbat#Shabbat_Chazon_–_of_Vision'>Chazon</a>)</small>`
        else if(["11 Av", "12 Av", "13 Av", "14 Av", "15 Av", "16 Av"].includes(thehebrewday)) specialshabbat = `<small>(<a target='_blank'  style="color:inherit;font-weight:700;text-decoration:underline" href='https://en.wikipedia.org/wiki/Special_Shabbat#Shabbat_Nachamu'>Nachamu</a>)</small>`
        else if(["1 Adar", "1 Adar II", "30 Adar I", "29 Adar I", "28 Adar I", "27 Adar I", "26 Adar I", "25 Adar I", "30 Shvat", "29 Shvat", "28 Shvat", "27 Shvat", "26 Shvat", "25 Shvat"].includes(thehebrewday)) specialshabbat = `<small>(<a target='_blank' style="color:inherit;font-weight:700;text-decoration:underline" href='https://en.wikipedia.org/wiki/Special_Shabbat#Shabbat_Shekalim_–_of_Shekels'>Shekalim</a>)</small>`
        else if(["8 Adar", "8 Adar II", "9 Adar", "9 Adar II", "10 Adar", "10 Adar II", "11 Adar", "11 Adar II", "12 Adar", "12 Adar II", "13 Adar", "13 Adar II"].includes(thehebrewday)) specialshabbat = `<small>(<a target='_blank' style="color:inherit;font-weight:700;text-decoration:underline" href='https://en.wikipedia.org/wiki/Special_Shabbat#Shabbat_Zachor_–_of_Remembrance'>Zachor</a>)</small>`
        else if(hebrewCons.charAt([hyear - 5660]) == "d" && ["17 Shvat", "11 Shvat", "12 Shvat", "13 Shvat", "14 Shvat", "15 Shvat", "16 Shvat"].includes(thehebrewday)) specialshabbat = `<small>(<a target='_blank' style="color:inherit;font-weight:700;text-decoration:underline" href='https://en.wikipedia.org/wiki/Special_Shabbat#Shabbat_Shirah_%E2%80%93_Song'>Shirah</a>)</small>`
        else if("rc".includes(hebrewCons.charAt([hyear - 5660])) && ["10 Shvat", "11 Shvat", "12 Shvat", "13 Shvat", "14 Shvat", "15 Shvat", "16 Shvat"].includes(thehebrewday)) specialshabbat = `<small>(<a target='_blank' style="color:inherit;font-weight:700;text-decoration:underline" href='https://en.wikipedia.org/wiki/Special_Shabbat#Shabbat_Shirah_%E2%80%93_Song'>Shirah</a>)</small>`
        weekly.innerHTML += `<h2 class="hebrew"><a style="color:inherit;text-decoration:dotted underline" href="https://en.wikipedia.org/wiki/Judaism" target="_blank">Judaism</a>: <a target="_blank" style="color:inherit;font-weight:700;text-decoration:underline" href="https://en.wikipedia.org/wiki/Shabbat">Shabbat</a>${specialshabbat}</h2>`
        weekly.innerHTML += `<h2 class="samaritan"><a style="color:inherit;text-decoration:dotted underline" href="https://en.wikipedia.org/wiki/Samaritanism" target="_blank">Samaritanism</a>: <a target="_blank" style="color:inherit;font-weight:700;text-decoration:underline" href="https://www.israelite-samaritans.com/religion/sabbath-observance/">Shabbat</a></h2>`
    }
    else if(thatday.Day == "Sunday"){
        weekly.innerHTML += `<h2 class="gregorian"><a style="color:inherit;text-decoration:dotted underline" href="https://en.wikipedia.org/wiki/Christianity" target="_blank">Christianity</a>: <a target="_blank" style="color:inherit;font-weight:700;text-decoration:underline" href="https://en.wikipedia.org/wiki/Lord%27s_Day">Lord's Day</a></h2>`
        weekly.innerHTML += `<h2 class="mandaean"><a style="color:inherit;text-decoration:dotted underline" href="https://en.wikipedia.org/wiki/Mandaeism" target="_blank">Mandaeanism</a>: <a target="_blank" style="color:inherit;font-weight:700;text-decoration:underline" href="https://en.wikipedia.org/wiki/Sunday#Sunday_in_Mandaeism">Habshaba</a></h2>`
    }
    if(weekly.innerHTML != "") weekly.innerHTML = "<h3>Holy day of week</h3>" + weekly.innerHTML

}


function internationalize(dy, cl){
    if(cl == "Gregorian" || cl.includes("Julian") || cl.includes("French")){
        dy = dy.split(" ")
        dy[0] = numeralize(dy[0], "Roman")
        dy[2] = numeralize(dy[2], "Roman")
        return dy.join(" ")
    }
    else if(cl == "Armenian"){
        dy = dy.split(" ")
        dy[0] = numeralize(dy[0], "Armenian")
        dy[1] = {"Nawasard": "Նաւասարդ", "Hoṙi": "Հոռի", "Sahmi": "Սահմի", "Trē": "Տրէ", "Kʿałocʿ": "Քաղոց", "Aracʿ": "Արաց", "Mehekan": "Մեհեկան", "Areg": "Արեգ", "Ahekan": "Ահեկան", "Mareri": "Մարերի", "Margacʿ": "Մարգաց", "Hroticʿ": "Հրոտից", "Aweleacʿ": "Աւելեաց"}[dy[1]]
        dy[2] = "<span style='text-decoration: overline'>ԹՎ</span> " + numeralize(dy[2], "Armenian")
        return dy.join(" ")
    }
    else if(cl == "Hebrew"){
        dy = dy.split(" ")
        dy[0] = numeralize(dy[0], "Hebrew")
        dy[1] = {"Tishrei": "תשרי‎", "Cheshvan": "חשון", "Kislev": "כסלו", "Tevet": "טבת", "Shvat": "שבט", "Adar": "אדר", "Adar I": "אדר א׳", "Adar II": "אדר ב׳", "Nisan": "ניסן", "Iyar": "אייר", "Sivan": "סיון", "Tammuz": "תמוז", "Av": "אב‎", "Elul": "אלול"}[dy[1]]
        dy[2] = numeralize(dy[2], "Hebrew")
        return dy.join(" ")
    }
    else if(cl == "Bahá'í" || cl == "Solar Hijri" || cl == "Tabarian" || cl == "Dilami"){
        for(x = 0; x <= 9; x++){
            dy = dy.replace(new RegExp(x, "g"), "۰۱۲۳۴۵۶۷۸۹"[x])
        }
        dy = dy.split(" ")
        dy = `<span dir="rtl">${dy[0]} ${{"Bahá": "بهاء", "Jalál": "جلال", "Jamál": "جمال", "ʻAẓamat": "عظمة", "Núr": "نور", "Raḥmat": "رحمة", "Kalimát": "كلمات", "Kamál": "كمال", "Asmáʼ": "اسماء", "ʻIzzat": "عزة", "Mas͟híyyat": "مشية", "ʻIlm": "علم", "Qudrat": "قدرة", "Qawl": "قول", "Masáʼil": "مسائل", "S͟haraf": "شرف","Sulṭán": "سلطان","Mulk": "ملك","Ayyám-i-Há": "ايام الهاء","ʻAláʼ": "علاء", "Farvardin": "فروردین", "Ordibehesht": "اردیبهشت", "Khordad": "خرداد", "Tir": "تیر", "Mordad": "مرداد", "Shahrivar": "شهریور", "Mehr": "مهر", "Aban": "آبان", "Azar": "آذر", "Dey": "دی", "Bahman": "بهمن", "Esfand": "اسفند", "Fardine Ma": "فردینه ما", "Kerche Ma": "کرچه ما", "Hare Ma": "هر ماه", "Tire Ma": "تیر ماه", "Melare Ma": "ملاره ما", "Shervine Ma": "شروینه ما", "Mire Ma": "میره ما", "Une Ma": "اونه ما", "Shishak": "شیشک", "Pitek": "پیتک", "Arke Ma": "ارکه ما", "De Ma": "دِ ماه", "Vahmane Ma": "وهمنه ما", "Nurze Ma": "نوروز ما", "Panjik": "پنجیک", "Vishak": "ویشَک", "Nowruz Ma": "نوروز ما", "Korch Ma": "کورچ ما", "Aria Ma": "اریه ما", "Tir Ma": "تیر ما", "Mordal Ma": "موردال ما", "Shrir Ma": "شریر ما", "Amir Ma": "امیر ما", "Aval Ma": "آوَل ما", "Sia Ma": "سیا ما", "Dia Ma": "دیا ما", "Orfne Ma": "ورفًنه ما", "Esfandar Ma": "اسفندار ما"}[dy.slice(1, -1).join(" ")]} ${dy[dy.length - 1]}${(cl == "Bahá'í" || cl == "Dilami") ? `` : " هـ ش"}</span>`
        return dy
    }
    else if(cl.startsWith("Islamic") || cl == "Kurdish"){
        for(x = 0; x <= 9; x++){
            dy = dy.replace(new RegExp(x, "g"), "٠١٢٣٤٥٦٧٨٩"[x])
        }
        dy = dy.split(" ")
        dy = `<span dir="rtl">${dy[0]} ${{"Xakelêwe": "خاکەلێوە", "Gullan": "گوڵان","Zerdan": "زەردان", "Puşperr": "پووشپەڕ","Gelawêj": "گەلاوێژ", "Xermanan": "خەرمانان","Beran": "بەران", "Xezan": "گێزان","Saran": "ﺳﺎﺮﺍﻦ", "Befran": "بەفران","Rêbendan": "ڕێبەندان", "Reşeme": "ڕەشەمە","Muharram": "محرم", "Safar": "صفر", "Rabiʽ al-Awwal": "ربيع الأول", "Rabiʽ al-Thani": "ربيع الآخر", "Jumada al-Awwal": "جمادى الأولى", "Jumada al-Thani": "جمادى الآخرة", "Rajab": "رجب", "Sha'ban": "شعبان", "Ramadan": "رمضان", "Shawwal": "شوال", "Dhu al-Qadah": "ذو القعدة", "Dhu al-Hijjah": "ذو الحجة"}[dy.slice(1, -1).join(" ")]} ${dy[dy.length - 1]}${cl == "Kurdish" ? "" :  " هـ"}</span>`
        return dy
    }
    else if(cl == "Bengali"){
        for(x = 0; x <= 9; x++){
            dy = dy.replace(new RegExp(x, "g"), "০১২৩৪৫৬৭৮৯"[x])
        }
        dy = dy.split(" ")
        dy = `${dy[0]} ${{"Boishakh": "বৈশাখ", "Jyoishţho": "জ্যৈষ্ঠ", "Ashaŗh": "আষাঢ়", "Shrabon": "শ্রাবণ", "Bhadro": "ভাদ্র", "Ashshin": "আশ্বিন", "Kartik": "কার্তিক", "Ôgrohayon": "অগ্রহায়ণ", "Poush": "পৌষ", "Magh": "মাঘ", "Falgun": "ফাল্গুন", "Choitro": "চৈত্র"}[dy.slice(1, -1).join(" ")]} ${dy[dy.length - 1]} বঙ্গাব্দ`
        return dy
    }
    else if(cl == "Javanese"){
        for(x = 0; x <= 9; x++){
            dy = dy.replace(new RegExp(x, "g"), "꧐꧑꧒꧓꧔꧕꧖꧗꧘꧙"[x])
        }
        dy = dy.split(" ")
        dy = `${dy[0]} ${{"Sura": "ꦱꦸꦫ", "Sapar": "ꦱꦥꦂ", "Mulud": "ꦩꦸꦭꦸꦢ꧀", "Bakda Mulud": "ꦧꦏ꧀ꦢꦩꦸꦭꦸꦢ꧀", "Jumadilawal": "ꦗꦸꦩꦢꦶꦭꦮꦭ꧀", "Jumadilakir": "ꦗꦸꦩꦢꦶꦭꦏꦶꦂ", "Rejeb": "ꦉꦗꦼꦧ꧀", "Ruwah": "ꦫꦸꦮꦃ", "Pasa": "ꦥꦱ", "Sawal": "ꦱꦮꦭ꧀", "Sela": "ꦱꦼꦭ", "Besar": "ꦧꦼꦱꦂ"}[dy.slice(1, -1).join(" ")]} ${dy[dy.length - 1]}`
        return dy
    }
    else if(cl == "Japanese"){
        dy = dy.split(" ")
        dy = `${{"Heisei": "平成", "Shōwa": "昭和", "Taishō": "大正", "Meiji": "明治", "Reiwa": "令和"}[dy[2]]}${dy[3]}年${{"January": "1月", "February": "2月", "March": "3月", "April": "4月", "May": "5月", "June": "6月", "July": "7月", "August": "8月", "September": "9月", "October": "10月", "November": "11月", "December": "12月"}[dy[1]]}${dy[0]}日`
        return dy
    }
    else if(cl == "Indian National" || cl == "Nepal Sambat Solar"){
        for(x = 0; x <= 9; x++){
            dy = dy.replace(new RegExp(x, "g"), "०१२३४५६७८९"[x])
        }
        dy = dy.split(" ")
        dy = `${dy[0]} ${{"Chaitra": "चैत्र", "Vaisakha": "वैशाख", "Jyaistha": "ज्येष्ठ", "Asadha": "आषाढ", "Sravana": "श्रावण", "Bhadra": "भाद्रपद", "Asvina": "अश्विन्", "Kartika": "कार्तिक", "Agrahayana": "आग्रहायण", "Pausa": "पौष", "Magha": "माघ", "Phalguna": "फाल्गुन", "Kachhalā": "कछला", "Thinlā": "थिंला", "Pwanhelā": "प्वँहेला", "Silā": "सिला", "Chilā": "चिला", "Chaulā": "चौला", "Bachhalā": "बछला", "Tachhalā": "तछला", "Dilā": "दिला", "Gunlā": "गुंला", "Yanlā": "यंला", "Kaulā": "कौला"}[dy.slice(1, -1).join(" ")]} ${dy[dy.length - 1]}`
        return dy
    }
    else if(cl == "Thai Solar"){
        for(x = 0; x <= 9; x++){
            dy = dy.replace(new RegExp(x, "g"), "๐๑๒๓๔๕๖๗๘๙"[x])
        }
        dy = dy.split(" ")
        dy = `${dy[0]} ${{"January": "มกราคม", "February": "กุมภาพันธ์", "March": "มีนาคม", "April": "เมษายน", "May": "พฤษภาคม", "June": "มิถุนายน", "July": "กรกฎาคม", "August": "สิงหาคม", "September": "กันยายน", "October": "ตุลาคม", "November": "พฤศจิกายน", "December": "ธันวาคม"}[dy.slice(1, -1).join(" ")]} ${dy[dy.length - 1]}`
        return dy + " พ.ศ."
    }
    else if(cl == "Nanakshahi"){
        for(x = 0; x <= 9; x++){
            dy = dy.replace(new RegExp(x, "g"), "੦੧੨੩੪੫੬੭੮੯"[x])
        }
        dy = dy.split(" ")
        dy = `${dy[0]} ${{"Chet": "ਚੇਤ", "Vaisakh": "ਵੈਸਾਖ", "Jeth": "ਜੇਠ", "Harh": "ਹਾੜ", "Sawan": "ਸਾਵਣ", "Bhadon": "ਭਾਦੋਂ", "Assu": "ਅੱਸੂ", "Kattak": "ਕੱਤਕ", "Maghar": "ਮੱਘਰ", "Poh": "ਪੋਹ", "Magh": "ਮਾਘ", "Phaggan": "ਫੱਗਣ"}[dy.slice(1, -1).join(" ")]} ${dy[dy.length - 1]}`
        return dy
    }
    else if(cl.startsWith("Mandaean")){
        dy = dy.split(" ")
        dy = `<span dir="rtl">${dy[0]} ${{"Daula": "ࡃࡀࡅࡋࡀ", "Nuna": "ࡍࡅࡍࡀ", "ʿmbra": "ࡏࡌࡁࡓࡀ", "Taura": "ࡕࡀࡅࡓࡀ", "Ṣilmia": "ࡑࡉࡋࡌࡉࡀ", "Sarṭana": "ࡎࡀࡓࡈࡀࡍࡀ", "Aria": "ࡀࡓࡉࡀ", "Šumbulta": "ࡔࡅࡌࡁࡅࡋࡕࡀ", "Qaina": "ࡒࡀࡉࡍࡀ", "Arqba": "ࡀࡓࡒࡁࡀ", "Hiṭia": "ࡄࡉࡈࡉࡀ", "Gadia": "ࡂࡀࡃࡉࡀ"}[dy.slice(1, -1).join(" ")]} ${dy[dy.length - 1]}</span>`
        return dy
    }
    else if(cl == "Berber"){
        dy = dy.split(" ")
        dy = `${dy[0]} ${{"Yennayer": "ⵢⴻⵏⵏⴰⵢⴻⵔ", "Yebrayer": "ⵢⴻⴱⵔⴰⵢⴻⵔ", "Mares": "ⵎⴰⵔⴻⵙ", "Yebrir": "ⵢⴻⴱⵔⵉⵔ", "May": "ⵎⴰⵢ", "Yunyu": "ⵢⵓⵏⵢⵓ", "Yulyuz": "ⵢⵓⵍⵢⵓⵣ", "Ɣuct": "ⵖⵓⵛⵜ", "Cutembir": "ⵛⵓⵜⴻⵎⴱⵉⵔ", "Ktuber": "ⴽⵜⵓⴱⴻⵔ", "Nwambir": "ⵏⵡⴰⵎⴱⵉⵔ", "Dujembir": "ⴷⵓⵊⴻⵎⴱⵉⵔ"}[dy.slice(1, -1).join(" ")]} ${dy[dy.length - 1]}`
        return dy
    }
    else if(cl == "Juche"){
        dy = dy.split(" ")
        dy = `${dy[0]} ${{"January": "일월", "February": "이월", "March": "삼월", "April": "사월", "May": "오월", "June": "유월", "July": "칠월", "August": "팔월", "September": "구월", "October": "시월", "November": "십일월", "December": "십이월"}[dy.slice(1, -1).join(" ")]} ${dy[dy.length - 1]}`
        return dy
    }
    else if(cl == "Minguo"){
        dy = dy.split(" ")
        dy = `${dy[0]} ${{"January": "一月", "February": "二月", "March": "三月", "April": "四月", "May": "五月", "June": "六月", "July": "七月", "August": "八月", "September": "九月", "October": "十月", "November": "十一月", "December": "十二月"}[dy.slice(1, -1).join(" ")]} 民國${dy[dy.length - 1]}年`
        return dy
    }
    else if(cl == "Coptic"){
        dy = dy.split(" ")
        dy[0] = numeralize(dy[0], "Coptic")
        dy[2] = numeralize(dy[2], "Coptic")
        dy = `${dy[0]} ${{"Thout": "Ⲑⲱⲟⲩⲧ", "Paopi": "Ⲡⲁⲟⲡⲓ", "Hathor": "Ⲁⲑⲱⲣ", "Koiak": "Ⲭⲟⲓⲁⲕ", "Tobi": "Ⲧⲱⲃⲓ", "Meshir": "Ⲙⲉϣⲓⲣ", "Paremhat": "Ⲡⲁⲣⲉⲙϩⲁⲧ", "Parmouti": "Ⲫⲁⲣⲙⲟⲩⲑⲓ", "Pashons": "Ⲡⲁϣⲟⲛⲥ", "Paoni": "Ⲡⲁⲱⲛⲓ", "Epip": "Ⲉⲡⲓⲡ", "Mesori": "Ⲙⲉⲥⲱⲣⲓ", "Pi Kogi Enavot": "Ⲡⲓⲕⲟⲩϫⲓ ⲛ̀ⲁ̀ⲃⲟⲧ",}[dy.slice(1, -1).join(" ")]} ${dy[dy.length - 1]}`
        return dy
    }
    else if(cl == "Ethiopian"){
        dy = dy.split(" ")
        dy = `${numeralize(dy[0], "Ethiopian")} ${{"Meskerem": "መስከረም", "Tikimt": "ጥቅምት", "Hidar": "ኅዳር", "Tahsas": "ታኅሣሥ", "Tir": "ጥር", "Yakatit": "የካቲት", "Maggabit": "መጋቢት", "Miyazya": "ሚያዝያ", "Ginbot": "ግንቦት", "Sene": "ሰኔ", "Hamle": "ሐምሌ", "Nehasa": "ነሐሴ", "Pagume": "ጳጉሜ",}[dy.slice(1, -1).join(" ")]} ${numeralize(dy[dy.length - 1], "Ethiopian")}`
        return dy
    }
    else if(cl == "Qadimi" || cl == "Fasli (Zoroastrian)" || cl == "Shahanshahi"){
        for(x = 0; x <= 9; x++){
            dy = dy.replace(new RegExp(x, "g"), "૦૧૨૩૪૫૬૭૮૯"[x])
        }
        dy = dy.split(" ")
        dy = `${dy[0]} ${{
            "Farvardin": "ફરવરદીન", 
            "Ardibehesht": "અરદિબેહસ્ત", 
            "Khordad": "ખોરદાદ", 
            "Tir": "તીર",
            "Amardad": "અમરદાદ",
            "Shehrevar": "શહેરેવર",
            "Mehr": "મેહર",
            "Aban": "આબાન", 
            "Azar": "આદર", 
            "Dae": "દએ", 
            "Bahman": "બેહમન", 
            "Asfand": "અસપંદાર", 
            "Ahunavaiti": "અહુનવઇ", 
            "Ushtavaiti": "ઉશતવઇ", 
            "Spentamainyu": "સપેનતોમઇ",
            "Vohuxshathra": "વોહુક્ષથ",
            "Vahishtoishti": "વહિશતોઈશત",
            "Avardad-sal-Gah": "અવરદાદ સાલ ગાહ"
        }[dy.slice(1, -1).join(" ")]} ${dy[dy.length - 1]}`
        return dy
    }

    else return ""
}

function numeralize(number, era){
    finalNum = ""
    if(era == "Roman"){
        romanArray = {
            "MMM": 3000,
            "MM": 2000,
            "M": 1000,
            "CM": 900,
            "DCCC": 800,
            "DCC": 700,
            "DC": 600,
            "D": 500,
            "CD": 400,
            "CCC": 300,
            "CC": 200,
            "C": 100,
            "XC": 90,
            "LXXX": 80,
            "LXX": 70,
            "LX": 60,
            "L": 50,
            "XL": 40,
            "XXX": 30,
            "XX": 20,
            "X": 10,
            "IX": 9,
            "VIII": 8,
            "VII": 7,
            "VI": 6,
            "V": 5,
            "IV": 4,
            "III": 3,
            "II": 2,
            "I": 1,
        }
        for(rA of Object.entries(romanArray)){
            if(number >= rA[1]){
                finalNum += rA[0]
                number = number - rA[1]
            }
        }
        return finalNum
    }
    else if(era == "Armenian"){
        armenianArray = {
            "Ս": 2000,
            "Ռ": 1000,
            "Ջ": 900,
            "Պ": 800,
            "Չ": 700,
            "Ո": 600,
            "Շ": 500,
            "Ն": 400,
            "Յ": 300,
            "Մ": 200,
            "Ճ": 100,
            "Ղ": 90,
            "Ձ": 80,
            "Հ": 70,
            "Կ": 60,
            "Ծ": 50,
            "Խ": 40,
            "Լ": 30,
            "Ի": 20,
            "Ժ": 10,
            "Թ": 9,
            "Ը": 8,
            "Է": 7,
            "Զ": 6,
            "Ե": 5,
            "Դ": 4,
            "Գ": 3,
            "Բ": 2,
            "Ա": 1,
        }
        for(rA of Object.entries(armenianArray)){
            if(number >= rA[1]){
                finalNum += rA[0]
                number = number - rA[1]
            }
        }
        return finalNum
    }
    else if(era == "Coptic"){
        copticArray = {
            "𐋢𐋠": 2000,
            "𐋡𐋠": 1000,
            "𐋻": 900,
            "𐋺": 800,
            "𐋹": 700,
            "𐋸": 600,
            "𐋷": 500,
            "𐋶": 400,
            "𐋵": 300,
            "𐋴": 200,
            "𐋳": 100,
            "𐋲": 90,
            "𐋱": 80,
            "𐋰": 70,
            "𐋯": 60,
            "𐋮": 50,
            "𐋭": 40,
            "𐋬": 30,
            "𐋫": 20,
            "𐋪": 10,
            "𐋩": 9,
            "𐋨": 8,
            "𐋧": 7,
            "𐋦": 6,
            "𐋥": 5,
            "𐋤": 4,
            "𐋣": 3,
            "𐋢": 2,
            "𐋡": 1,
        }
        for(rA of Object.entries(copticArray)){
            if(number >= rA[1]){
                finalNum += rA[0]
                number = number - rA[1]
            }
        }
        return finalNum
    }
    else if(era == "Ethiopian"){
        ethiopianArray = {
            "፳፮፻": 2600,
            "፳፭፻": 2500,
            "፳፬፻": 2400,
            "፳፫፻": 2300,
            "፳፪፻": 2200,
            "፳፩፻": 2100,
            "፳፻": 2000,
            "፲፱፻": 1900,
            "፲፰፻": 1800,
            "፺": 90,
            "፹": 80,
            "፸": 70,
            "፷": 60,
            "፶": 50,
            "፵": 40,
            "፴": 30,
            "፳": 20,
            "፲": 10,
            "፱": 9,
            "፰": 8,
            "፯": 7,
            "፮": 6,
            "፭": 5,
            "፬": 4,
            "፫": 3,
            "፪": 2,
            "፩": 1,
        }
        for(rA of Object.entries(ethiopianArray)){
            if(number >= rA[1]){
                finalNum += rA[0]
                number = number - rA[1]
            }
        }
        return finalNum
    }
    else if(era == "Hebrew"){
        hebrewArray = {
            "ה׳": 5000,
            "ד׳": 4000,
            "ג׳": 3000,
            "ב׳": 2000,
            "א׳": 1000,
            "תתק": 900,
            "תת": 800,
            "תש": 700,
            "תר": 600,
            "תק": 500,
            "ת": 400,
            "ש": 300,
            "ר": 200,
            "ק": 100,
            "צ": 90,
            "פ": 80,
            "ע": 70,
            "ס": 60,
            "נ": 50,
            "מ": 40,
            "ל": 30,
            "כ": 20,
            "יט": 19,
            "יח": 18,
            "יז": 17,
            "טז": 16,
            "טו": 15,
            "י": 10,
            "ט": 9,
            "ח": 8,
            "ז": 7,
            "ו": 6,
            "ה": 5,
            "ד": 4,
            "ג": 3,
            "ב": 2,
            "א": 1,
        }
        for(rA of Object.entries(hebrewArray)){
            if(number >= rA[1]){
                finalNum += rA[0]
                number = number - rA[1]
            }
        }
        if(finalNum.length > 1 && !finalNum.endsWith("׳")){
            finalNum = finalNum.slice(0, -1) + "״" + finalNum.slice(-1)
        }
        return finalNum
    }
}




function generateYear(y, n){
    yO = {
        months: {},
    }
    yO.months = calendars[n].months
    if(calendars[n].intercalary.type == "day"){
        if(calendars[n].intercalary.method(y)){
            yO.months[calendars[n].intercalary.month].days = interCal[n].split("/")[1]
        }
        else{
            yO.months[calendars[n].intercalary.month].days = interCal[n].split("/")[0]
        }
    }
    else if(n == "Hebrew"){ //FIX
        yy = hebrewCons.charAt([y - 5660])
        yO.months[1].days = yy == "c" ? 30 : 29
        yO.months[2].days = yy == "d" ? 29 : 30
        if([3,6,8,11,13,17,0].includes(y % 19)){
            yO.months[5].days = 0
            yO.months[6].days = 30
            yO.months[7].days = 29
        }
        else{
            yO.months[5].days = 29
            yO.months[6].days = 0
            yO.months[7].days = 0
           // yO.months[5].name = "Adar"
        }
    }
    /*
    else if(n == "Burmese"){ //FIX
        if([2,5,7,10,13,15,18].includes(y % 19)){
            yO.months[3].name = "Pahtamawahso"
            yO.months[4].days = 30
        }
        else{
            yO.months[3].name = "Wahso"
            yO.months[4].days = 0
        }
        if((((((y * 12 + 4) + Math.floor((y * 12 + 4) * 7 / 228)) * 30 + 14) * 11 + 650) % 703) > ((((((y - 1) * 12 + 4) + Math.floor(((y - 1) * 12 + 4) * 7 / 228)) * 30 + 14) * 11 + 650) % 703)){
            yO.months[2].days = 30
        }
        else{
            yO.months[2].days = 29
        }
        //
    }*/



    // thai code section
    if(n == "Thai Solar"){
        if(y < 2483){
            gg = {
                months: [
                    {
                        name: "April",
                        days: 30,
                        link: "https://en.wikipedia.org/wiki/April",
                    },
                    {
                        name: "May",
                        days: 31,
                        link: "https://en.wikipedia.org/wiki/May",
                    },
                    {
                        name: "June",
                        days: 30,
                        link: "https://en.wikipedia.org/wiki/June",
                    },
                    {
                        name: "July",
                        days: 31,
                        link: "https://en.wikipedia.org/wiki/July",
                    },
                    {
                        name: "August",
                        days: 31,
                        link: "https://en.wikipedia.org/wiki/August",
                    },
                    {
                        name: "September",
                        days: 30,
                        link: "https://en.wikipedia.org/wiki/September",
                    },
                    {
                        name: "October",
                        days: 31,
                        link: "https://en.wikipedia.org/wiki/October",
                    },
                    {
                        name: "November",
                        days: 30,
                        link: "https://en.wikipedia.org/wiki/November",
                    },
                    {
                        name: "December",
                        days: 31,
                        link: "https://en.wikipedia.org/wiki/December",
                    },
                    {
                        name: "January",
                        days: 31,
                        link: "https://en.wikipedia.org/wiki/January",
                    },
                    {
                        name: "February",
                        days: ((y - 542) % 4 == 0 && !((y - 542) % 100 == 0 && (y - 542) % 400 != 0)) ? 29 : 28,
                        link: "https://en.wikipedia.org/wiki/February",
                    },
                    {
                        name: "March",
                        days: 31,
                        link: "https://en.wikipedia.org/wiki/March",
                    },
                ],
            }
        }
        else if(y == 2483){
            gg = {
                months: [
                    {
                        name: "April",
                        days: 30,
                        link: "https://en.wikipedia.org/wiki/April",
                    },
                    {
                        name: "May",
                        days: 31,
                        link: "https://en.wikipedia.org/wiki/May",
                    },
                    {
                        name: "June",
                        days: 30,
                        link: "https://en.wikipedia.org/wiki/June",
                    },
                    {
                        name: "July",
                        days: 31,
                        link: "https://en.wikipedia.org/wiki/July",
                    },
                    {
                        name: "August",
                        days: 31,
                        link: "https://en.wikipedia.org/wiki/August",
                    },
                    {
                        name: "September",
                        days: 30,
                        link: "https://en.wikipedia.org/wiki/September",
                    },
                    {
                        name: "October",
                        days: 31,
                        link: "https://en.wikipedia.org/wiki/October",
                    },
                    {
                        name: "November",
                        days: 30,
                        link: "https://en.wikipedia.org/wiki/November",
                    },
                    {
                        name: "December",
                        days: 31,
                        link: "https://en.wikipedia.org/wiki/December",
                    },
                ],
            }
        }
        else if(y > 2483){
            gg = {
                months: [
                    {
                        name: "January",
                        days: 31,
                        link: "https://en.wikipedia.org/wiki/January",
                    },
                    {
                        name: "February",
                        days: ((y - 543) % 4 == 0 && !((y - 543) % 100 == 0 && (y - 543) % 400 != 0)) ? 29 : 28,      
                        link: "https://en.wikipedia.org/wiki/February",          
                    },
                    {
                        name: "March",
                        days: 31,
                        link: "https://en.wikipedia.org/wiki/March",
                    },
                    {
                        name: "April",
                        days: 30,
                        link: "https://en.wikipedia.org/wiki/April",
                    },
                    {
                        name: "May",
                        days: 31,
                        link: "https://en.wikipedia.org/wiki/May",
                    },
                    {
                        name: "June",
                        days: 30,
                        link: "https://en.wikipedia.org/wiki/June",
                    },
                    {
                        name: "July",
                        days: 31,
                        link: "https://en.wikipedia.org/wiki/July",
                    },
                    {
                        name: "August",
                        days: 31,
                        link: "https://en.wikipedia.org/wiki/August",
                    },
                    {
                        name: "September",
                        days: 30,
                        link: "https://en.wikipedia.org/wiki/September",
                    },
                    {
                        name: "October",
                        days: 31,
                        link: "https://en.wikipedia.org/wiki/October",
                    },
                    {
                        name: "November",
                        days: 30,
                        link: "https://en.wikipedia.org/wiki/November",
                    },
                    {
                        name: "December",
                        days: 31,
                        link: "https://en.wikipedia.org/wiki/December",
                    },
                ],
            }
        }
    }
    if(n == "Thai Solar") return gg

    return yO
}


reset()