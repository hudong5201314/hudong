//设计“word对象”的数据结构，并用对象的方法实现初步的代码组织
//en6为全局变量，由大学英语6级词汇形成字符串，组成数组
var myWord = {
    id: 0,
    en: "",
    pn: "",
    cn: "",
    getWord: function (id) {
        // 实现对单词数组的切割
        let string = en6[id].split("/");
        myWord.en = string[0];
        myWord.pn = string[1];
        myWord.cn = string[2];
        return myWord;
    },//end of getWord Method
    showWord: function () {
        $("#en").val(myWord.en);
        $("#pn").text("/" + myWord.pn + "/");
        $("#cn").text(myWord.cn);

    } //end of showWord Method
};//end of myWord Object

//建立一个模型对象，模拟和记录APP的运行状态
var Model = {
    learnWords: [], //学习单词的id组成的数组
    learnId: 0,
    myButton: "",
    myImages: null,
    showHelp: function () {

    },//End of showHelp
}; //End of  Model

//每次循环产生10个随机单词放在 Model 模型中
function randomWords(num) {
    for (let i = 0; i < num; i++) {
        myWord.id = Math.floor(Math.random() * en6.length);
        Model.learnWords[i] = myWord.id;
    }
}

//  单词切换函数
function wordsChange(j) {
    //  去词库中查找单词
    myWord.getWord(Model.learnWords[j]);

    //  把单词展示在屏幕上
    myWord.showWord();

    if (j === 9) {
        $("h1").text("当前单词：第" + (j + 1) + "个,恭喜你，可以继续学习下一组单词了");
    } else {
        $("h1").text("当前单词：第" + (j + 1) + "个");
    }

    //  判断当前模式 决定单词显示格式
    if (window.flot === 1) {
        $("#en").val("").attr("placeholder", "请输入当前单词");
    } else if (window.flot === 2) {
        $("h1").text("请点击你认为正确的单词,系统会马上给出判断");
    }
}

//  为选一选中按钮单词赋值
function buttonWordsShow() {


    //  设置四个选项中随机一个为正确的单词
    var buttonId = Math.floor(Math.random() * 3);
    $("#" + buttonId).text(myWord.en);

    for (var k = 0; k < 4; k++) {
        if (buttonId != k) {
            //  为其余剩下的选项设置随机的单词
            var tmp = (en6[Math.floor(Math.random() * en6.length)].split("/"))[0];
            $("#" + k).text(tmp);
        }
    }
}

//  判断对应的模式对页面的显示做出不同的展示
function judge() {
    if (window.flot === 0) {  //  读一读模式
        //  设置原来的单词输入框为可见,并设置为只可读模式
        $("#en").attr("style", "").attr("readonly", "readonly");

        //  清空在选一选模式中生成的按钮
        $(".wordsSelect").remove();

        //  清空原来生成的答案按钮
        $("#answer").remove();

        //  设置上一页下一页可见
        $("#next").attr("style", "");
        $("#pre").attr("style", "");
    } else if (window.flot === 1) {
        //  设置原来的单词输入框为可见,并取消只可读模式
        $("#en").attr("style", "").removeAttr("readonly");

        //  清空在选一选模式中生成的按钮
        $(".wordsSelect").remove();

        //  清空原来生成的答案按钮
        $("#answer").remove();

        //  增加提示答案功能
        $("#buttonFoot").append(("<span id='answer'>答案</span>"));

        //  设置上一页下一页可见
        $("#next").attr("style", "");
        $("#pre").attr("style", "");
    } else if (window.flot === 2) {  //  选一选模式
        //  设置原来的单词输入框为不可见
        $("#en").attr("style", "display:none");

        //清空上一次生成的按钮 防止多次点击选一选而生成多个选择按钮
        $(".wordsSelect").remove();

        //  清空原来生成的答案按钮
        $("#answer").remove();

        //  增加提示答案功能
        $("#buttonFoot").append(("<span id='answer'>答案</span>"));

        //  设置上一页下一页可见
        $("#next").attr("style", "");
        $("#pre").attr("style", "");
    } else {  //  搜一搜模式

        $("h1").text("查找模式");

        //  设置原来的单词输入框为可见,并取消只可读模式
        $("#en").attr("style", "").removeAttr("readonly");

        //  清空在选一选模式中生成的按钮
        $(".wordsSelect").remove();

        //  清空原来生成的答案按钮
        $("#answer").remove();

        //  增加查找功能
        $("#buttonFoot").append(("<span id='answer'>查找</span>"));

        //  设置上一页下一页不可见
        $("#next").attr("style", "display:none");
        $("#pre").attr("style", "display:none");
    }
}

//  查找单词
function find(words) {
    var m = 0;

    //  循环遍历查找
    for (; m < en6.length; m++) {
        var word = en6[m].split("/");
        if (words === word[0]) {
            myWord.pn = word[1];
            myWord.cn = word[2];
            return myWord;
        }

    }

    //  如果没找到则返回空
    if (m >= en6.length) {
        myWord.pn = "";
        myWord.cn = "";
        return myWord;
    }


}


window.onload = function () {

//动态控制UI，包括：不同屏幕的字体大小设置，主区域的高度设置
    var fontSize = Math.floor(window.innerWidth / 100);
    console.log(fontSize);
    switch (fontSize) {
        case 15 :
        case 14 :
        case 13 :
        case 12 :
        case 11 :
        case 10 :
            fontSize = fontSize * 1.5;
            break;
        case 9 :
        case 8 :
        case 7 :
            fontSize = fontSize * 2;
            break;
        case 6 :
        case 5 :
        case 4 :
            fontSize = fontSize * 2.8;
            break;
        default:
            fontSize = fontSize * 4;
    }
    document.body.style.fontSize = fontSize + "px";

    var sectionHeight = window.innerHeight - 150 - 50 - 50;
    document.querySelector("section").style.height = sectionHeight + "px";

    //为所有自定义的按钮设定特殊风格
    var myButtons = document.querySelectorAll("nav span");
    for (var i = 0; i < myButtons.length; i++) {
        myButtons[i].onclick = function () {
            for (var j = 0; j < myButtons.length; j++) {
                myButtons[j].className = "";
            }
            this.className = "onclickStyle";
        };//end of  myButtons[i].onclick
    }

    //每次打开页面，则随机出现一张图片
    var myImages = [];//图像对象 组成的 数组
    for (var i = 1; i < 8; i++) {
        var img = new Image();
        img.src = "images/" + i + ".jpg";
        //img.style.opacity = "0.5" ;
        myImages.push(img);
    }
    Model.myImages = myImages;//把图片集传给Model对象，提供使用
    var backPicDom = document.querySelector("article#help div#backPic");
    var randInt = Math.floor(Math.random() * 7);
    backPicDom.appendChild(myImages[randInt]);



    //  定义一个变量j控制单词下标的切换
    var j = 0;

    // 定义一个全局变量 控制 不同模式下 对应单词的不同显示情况
    // 0 读一读 1 写一写 2 选一选 3搜一搜
    window.flot = 0;

    //  听一听模式
    $("#listen").click(function () {
        layer.msg("输入英文 听一听");
    })

    //  搜一搜模式
    $("#search").click(function () {

        window.flot = 3;
        layer.msg("输入英文 查询中文和音标");



        //  判断当前模式
        judge();

        $("#en").val("").attr("placeholder", "请输入需要查找的单词");
        $("#pn").text("音标");
        $("#cn").text("中文意思");

    })

    //  选一选功能
    $("#select").click(function () {
        window.flot = 2;

        // 自动生成一组 10个单词
        randomWords(10);
        j = 0;
        wordsChange(j);
        layer.msg("选一选模式，自动生成了一组（10）个单词，请点击选择正确的单词");

        //  判断当前模式
        judge();


        // 生成四个按钮 对应四个单词选项
        var button1 = $("<button id='0' class='wordsSelect'>单词选项一</button>");
        var button2 = $("<button id='1' class='wordsSelect'>单词选项二</button>");
        var button3 = $("<button id='2' class='wordsSelect'>单词选项三</button>");
        var button4 = $("<button id='3' class='wordsSelect'>单词选项四</button>");
        $("#en").after(button4).after(button3).after(button2).after(button1);

        //  为按钮赋值
        buttonWordsShow();

    });

    //  为生成的四个选择按钮绑定点击事件
    //  由于button按钮是动态生成的 需要使用事件的委托 把事件委托给任意一个静态的元素
    $(window).on("click", ".wordsSelect", function () {
        var chooseWords = $(this).text();
        if (chooseWords === myWord.en) {
            $("h1").text("恭喜你，选项正确， 当前单词:【 " + myWord.en + " 】");
        } else {
            $("h1").text("选择错误，再想想吧");
        }
    });


    //  写一写按钮
    $("#write").click(function () {
        window.flot = 1;

        //  设置当前页面显示格式
        judge();

        // 自动生成一组 10个单词
        randomWords(10);
        layer.msg("写一写模式，自动生成了一组（10）个单词，请拼写单词");
        j = 0;
        wordsChange(j);

    })

    //  读一读按钮
    $("#read").click(function () {
        window.flot = 0;

        //  设置当前页面显示格式
        judge();

        // 自动生成一组 10个单词
        randomWords(10);
        layer.msg("读一读模式，自动生成了一组（10）个单词");

        //  把i置0
        j = 0;

        //  首先生成第一个单词
        wordsChange(j);


    })

    //  点击下一个按钮 控制一组单词的切换
    $("#next").click(function () {
        //  判断如果没有生成单词组 则禁止切换
        if (Model.learnWords.length === 0) {
            layer.msg("请选择上面的模式进行学习");
            return;
        }
        j += 1;

        //  判断角标越界
        if (j >= 9) {
            j = 9;
            layer.msg("当前是最后一个单词");
        }

        //  执行单词切换
        wordsChange(j);

        //  对选一选模式做出特殊处理
        if (window.flot === 2) {
            buttonWordsShow();
        }
    });

    //  点击上一个按钮 控制一组单词的切换
    $("#pre").click(function () {
        if (Model.learnWords.length === 0) {
            layer.msg("请选择上面的模式进行学习");
            return;
        }
        j -= 1;

        //  判断角标越界
        if (j <= 0) {
            j = 0;
            layer.msg("当前已经是首个单词");
        }

        //  执行单词切换
        wordsChange(j);

        //  对模式二的特殊处理
        if (window.flot === 2) {
            buttonWordsShow();
        }
    })

    //  写一写功能中 为输入框绑定改变事件 检测用户输入的单词 做出响应
    $("#en").change(function () {

        //  判断 只针对写一写模式做出chang事件
        if (window.flot === 1) {
            var wordsInput = $(this).val();
            if (wordsInput === myWord.en) {
                layer.msg("恭喜你，单词拼对了");
            } else {
                layer.msg("请再想想，单词拼写错误");
            }
        } else {
            return ;
        }

    });

    //  为生成的提示答案按钮绑定单击事件
    //  由于button按钮是动态生成的 需要使用事件的委托 把事件委托给任意一个静态的元素
    $(window).on("click", "#answer", function () {

        //  判断 模式不同做出不同的操作
        if (window.flot === 3){

            //  获取输入的要查找的单词
            var words = $("#en").val();

            if (words.length === 0) {
                layer.msg("请输入单词后再查询");
            } else {
                //  不为空则调用查找函数
                myWord = find(words);

                if ((myWord.cn.length) === 0) {
                    $("h1").text("查找失败，单词库没有该单词");
                    layer.msg("查找失败");
                } else {
                    $("h1").text("查找成功");
                    layer.msg("查找成功");
                    $("#pn").text("/"+myWord.pn+"/");
                    $("#cn").text(myWord.cn);
                }
            }
        }else {
            layer.msg(myWord.en);
        }

    });



};//end of window.onload
//-->
