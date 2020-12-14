var VueObj = new Vue({
    el:".content",
    data:{
        sort:"number",
        skip:0,
        direction:"desc",
        responseObj:{
            items:[],
        },
        number: true,
        hash: true,
        blockClosed: true,
        blockTime: true,
        miner: true,
        minerVoices: false,
        coinbaseBIN: false,
        coinbaseHEX: false,
        transCount: true,
        transWithWitness: false,
        inputsCount: false,
        outputsCount: false,
        coindays: false,
        comissionsBTC: true,
        comissionsUSD: false,
        GeneratedBTC: true,
        GeneratedUSD: false,
        rewardBTC: true,
        rewardUSD: false,
        inputsSummBTC: false,
        outputsSummBTC: true,
        inputsSummUSD: false,
        outputsSummUSD: false,
        sizeKB: true,
        weight: false,
        clearSize: false,
        versionINT: false,
        versionHEX: false,
        versionBits: false,
        medianTime: false,
        merkleRoot: false,
        bits: false,
        difficulty: false,
        nonce: false,
        arrows:{
            numberArrow:"desc",
            blockClosedArrow:"",
            blockTimeArrow:"",
            transCountArrow:"",
            transWithWitnessArrow:"",
            inputsCountArrow:"",
            outputsCountArrow:"",
            coindaysArrow:"",
            inputsSummBTCArrow:"",
            inputsSummUSDArrow:"",
            outputsSummBTCArrow:"",
            outputsSummUSDArrow:"",
            comissionsBTCArrow:"",
            comissionsUSDArrow:"",
            GeneratedBTCArrow:"",
            GeneratedUSDArrow:"",
            rewardBTCArrow:"",
            rewardUSDArrow:"",
            sizeKBArrow:"",
            weightArrow:"",
            clearSizeArrow:"",
            medianTimeArrow:"",
            bitsArrow:"",
            difficultyArrow:"",
            nonceArrow:"",
        },
        tbodyLoad:"",
        loading:"none",
        firstStart:true,
        addLoader:"none",
        TotalCount:"null",
    },
    methods: {
        asyncCall: async function (url,type) {
            let response;
            if(!this.firstStart && type!=="add"){
                this.loading = 'flex';
                this.tbodyLoad = 'none';
                $( ".tbody" ).slideUp();
                $('.content .big-table__table').css('overflow-x','hidden');
            }
            this.firstStart = false;
            if(type!=="add"){
                let count_row = this.responseObj.items.length;
                for (l=0;l<=this.skip;l++){
                    response = await this.getData(url+l);
                }
                this.responseObj.items.splice(0,count_row);
            }else {
                this.addLoader = "initial";
                response = await this.getData(url);
            }
            this.loading = 'none';
            this.addLoader = "none";
            this.tbodyLoad = 'table-row-group';
            $('.content .big-table__table').css('overflow-x','auto');
            $('body').css('display','block');
        },
        getData: function (url) {
            return new Promise(resolve => {
                console.log(decodeURIComponent(url));
                fetch(url).then(
                    function (resp) {return resp.text()}).then(function (r) {
                        if (JSON.parse(r).Items.length !== 0) {
                            JSON.parse(r).Items.forEach(function (el, i) {
                                VueObj.responseObj.items.push(el);
                                if(i===0){
                                    VueObj.TotalCount = VueObj.TotalCount<=0?0:(parseInt(JSON.parse(r).TotalCount)-((VueObj.skip+1)*15));
                                }
                                resolve(VueObj.responseObj);
                            })
                        }
                    })
            })
        },
        arrowSort: function (element) {
            Object.keys(VueObj.arrows).forEach(function(el){
                VueObj.arrows[el] = ""
            });
            this.direction = element.target.dataset.direction;
            this.sort = element.target.dataset.sort;
            this[element.target.dataset.name] = true;
            this.arrows[element.target.dataset.prop] = element.target.dataset.direction;
            element.target.closest('li').querySelector(".checkbox").classList.add('check-active');
            let el = element.target.closest('li').querySelector(".checkbox i");
            el.classList.remove('fa-square');
            el.classList.add('fa-check-square');
            this.asyncCall("https://testapi.mexm.io/api/public/blocks?sort="+this.sort+"&direction="+this.direction+"&skip=","sort");
        },
        defaultFunc: function(){
            // location.reload();
            let true_mas = ["number","hash","blockClosed","blockTime","miner","transCount","comissionsBTC","GeneratedBTC","rewardBTC","outputsSummBTC","sizeKB"],
                false_mas = ["minerVoices","coinbaseBIN","coinbaseHEX","transWithWitness","inputsCount","outputsCount","coindays","comissionsUSD","GeneratedUSD","rewardUSD","inputsSummBTC","inputsSummUSD","outputsSummUSD","weight","clearSize","versionINT","versionHEX","versionBits","medianTime","merkleRoot","bits","difficulty","nonce"];
            true_mas.forEach(function(el){
                VueObj[el] = true;
            });
            false_mas.forEach(function(el){
                VueObj[el] = false;
            });
                VueObj.sort = "number";
                VueObj.direction = "desc";
                VueObj.responseObj.items = [];
                Object.keys(VueObj.arrows).forEach(function(el){
                    VueObj.arrows[el] = ""
                });
                VueObj.arrows.numberArrow = 'desc';
                if(VueObj.skip===0){
                    this.asyncCall("https://testapi.mexm.io/api/public/blocks?sort="+this.sort+"&direction="+this.direction+"&skip=","sort");
                }else{
                    VueObj.skip = 0;
                }
            $.each($('.checkbox.check-active'),function(i,el){
                el.classList.remove('check-active');
                el.querySelector('i').classList.remove('fa-check-square');
                el.querySelector('i').classList.add('fa-square');
            });
            $.each($('.arrow'),function(i,el){
                el.classList.remove('arrow-active');
            });
                $('.arrow')[0].classList.add('arrow-active');
            $.each($('.checkbox'),function(i,el){
                let mas = [0,1,2,3,4,8,15,17,19,21,23];
                if(mas.indexOf(i)>=0){
                    el.classList.add('check-active');
                    el.querySelector('i').classList.add('fa-check-square');
                    el.querySelector('i').classList.remove('fa-square');
                }
            });
            },
        showAll: function(){
            $.each($('.checkbox:not(".check-active")'),function(el){
                this.click();
            });
        },
        hideAll: function(){
            $.each($('.checkbox.check-active'),function(i,el){
                if(i!==0){
                    el.click();
                }
            });
        },
        clearSort: function(){
            this.sort = "number";
            this.direction = "desc";
            $('.arrow i')[0].click();
        },
        update: function(){
                this.asyncCall("https://testapi.mexm.io/api/public/blocks?sort="+this.sort+"&direction="+this.direction+"&skip=","sort");
        },
        addRows: function(){
            this.skip++;
        },
        awaitLoad: function(){
            var left = 0;
            this.interval_  = setInterval(function(){
                left+=30;
                if(left>$('.big-table__table').width()){
                    left=0;
                }
                $('.indicator').css("margin-left",left+'px')
            },100);
        },
        changeHash:function(element){
            let elem = element.target;
            if(element.target.classList[0]==='dots' || element.target.classList.length===0){
                elem = element.target.closest('.hash');
            };
            if(elem.innerHTML === elem.dataset.fullname){
                elem.innerHTML =  elem.dataset.short
            }else{
                elem.innerHTML = elem.dataset.fullname;
            }
        },
        reformedString: function(str){
            if(str!==null){
                let hc = Math.floor((str.length)/3),
                    resultStr = "";
                for(i=0;i<hc;i++){
                    resultStr=str.substr(str.length-((i+1)*3),3)+" "+resultStr;
                }
                return (str.substr(0,str.length-(3*hc))+ " "+ resultStr).trim();
            }else{
                return str;
            }
        },
        f_1:function (str) {
            return str!==null && str.indexOf(',')>=0?(str.split(',')[0]+"."+str.split(',')[1].substr(0,2)):"";
        },
        f_2:function(str){
            return str!==null && str.indexOf(',')>=0?((str).split(',')[1].substr(2,6)):"";
        },
    } ,
    created:function(){
        this.asyncCall("https://testapi.mexm.io/api/public/blocks?sort="+this.sort+"&direction="+this.direction+"&skip=","sort");
    },
    watch:{
        skip: function(val,oldVal){
            this.asyncCall("https://testapi.mexm.io/api/public/blocks?sort="+this.sort+"&direction="+this.direction+"&skip="+this.skip,"add");
        },
    }
});