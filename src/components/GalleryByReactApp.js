'use strict';

var React = require('react/addons');
// var ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
require('normalize.css');
require('../styles/main.scss');
//获取图片的相关数据
var imageDatas = require('../data/imageData.json');
// var imageURL = require('../images/yeoman.png');
//利用自执行函数，将图片名信息转成图片URL路径
imageDatas = (function genImageURL(imageDatasArr) {
  var j = imageDatasArr.length;
  for(var i = 0; i < j; i++){
    var singleImageData = imageDatasArr[i];
    singleImageData.imageURL = require('../images/' + singleImageData.fileName);
      imageDatasArr[i] = singleImageData;
  }
     return imageDatasArr;
})(imageDatas);
// imageDatas =genImageURL(imageDatas);

function getRangeRandom(low, high){
  return Math.ceil(Math.random() * (high - low) + low);
}

function getRotate30Deg(){
return (Math.random() > 0.5 ? '' : '-') + Math.ceil((Math.random() * 30));
}

var ImgFigure = React.createClass({
  //点击处理函数
  handleClick: function(e){
    if(this.props.arrange.isCenter){
      this.props.inverse();
    }else{
        this.props.center();
    }

    e.stopPropagation();
    e.preventDefault();
  },


  render: function() {
   var styleObj = {};
     // 如果props属性中指定了这张图片的位置则使用
  if(this.props.arrange.pos){
     styleObj = this.props.arrange.pos;
  }

  if(this.props.arrange.rotate){
      (['-moz-', '-ms-', '-webkit-', '']).forEach(function (value){
styleObj[value + ' transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';

      }.bind(this));
  }
  if(this.props.arrange.isCenter){
   styleObj.zIndex = 11;
  }

     var imgFigureClassName = 'img-figure';
      imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

     return (
       <figure className = {imgFigureClassName} style = {styleObj}
       onClick={this.handleClick}>
       <img src = {this.props.data.imageURL}
            alt = {this.props.data.title}
          />
          <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handleClick}>
          <p>{this.props.data.desc}</p>
          </div>
          </figcaption>
       </figure>

     );
   }
});
var GalleryByReactApp = React.createClass({
   Constant: {
     centerPos: {
       left: 0,
       top: 0
     },
     hPosRange: { //水平方向的取值范围
       leftSecx: [0, 0],
       rightSecx: [0, 0],
       y: [0, 0]
     },
     vPosRange: { //垂直方向的取值范围
       x: [0, 0],
       topY: [0, 0]
     }
   },
   /*
   * 翻转图片
   * @param index 输入当前被窒息的inverse操作的图片对应图片信息数组的index值
   * @return {function} 这是一个闭包函数， 其内return 一个真正待被执行的函数
   */
   inverse: function (index) {
     return function(){
       var imgsArrangeArr = this.state.imgsArrangeArr;
       imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
       this.setState({
         imgsArrangeArr: imgsArrangeArr
       });
     }.bind(this);
   },
  //重新布局图片
   rearrange: function(centerIndex){
    var imgsArrangeArr = this.state.imgsArrangeArr,
       Constant = this.Constant,
       centerPos = Constant.centerPos,
       hPosRange = Constant.hPosRange,
       vPosRange = Constant.vPosRange,
       hPosRangeLeftSecx = hPosRange.leftSecx,
       hPosRangeRightSecx = hPosRange.rightSecx,
       hPosRangeY = hPosRange.y,
       vPosRangeTopY = vPosRange.topY,
       vPosRangeX = vPosRange.x,

       imgsArrangeTopArr = [],
       topImgNum = Math.ceil(Math.random() * 2),//取一个或或者不去
       topImgSpliceIndex = 0,
       imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
      // 首先剧中 centerIndex 的图片
      imgsArrangeCenterArr[0] = {
        pos: centerPos,
        rotate: 0,
        isCenter: true
      };
    //  // 剧中的图片不用旋转
    //   imgsArrangeCenterArr[0].rotate = 0;

      // 取出要布局上侧的图片状态信息
      topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
      imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

      //布局位于上侧的图片
      imgsArrangeTopArr.forEach(
        function(value, index){
          imgsArrangeTopArr[index] = {
            pos: {
              top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
              left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
            },
            rotate: getRotate30Deg(),
              isCenter: false
          };
        }
      );
      //布局左右两层的图片信息
      for(var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++){
        var hPosRangeLORX = null;
        // 前半部分布局左边，后半部分布局右边
        if(i < k){
          hPosRangeLORX = hPosRangeLeftSecx;
        }else{
          hPosRangeLORX = hPosRangeRightSecx;
        }
imgsArrangeArr[i] = {
    pos: {
      top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
      left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
    },
    rotate: getRotate30Deg(),
      isCenter: false
  };
 }
             if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
               imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
             }

             imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
             this.setState({
                  imgsArrangeArr: imgsArrangeArr
             });
   },
center: function functionName(index) {
  return function(){
    this.rearrange(index);
  }.bind(this);
},
getInitialState: function(){
  return {
    imgsArrangeArr: [
      /*
      {
      //   pos: {
      //     left: '0',
      //     top: '0'
      //   },
      //   rotate: 0
           isInverse: false
           isCenter:false
      // }
      */

    ]
  };
},

   //组件加载以后，为每张图片计算其位置
componentDidMount: function (){
   var stageDOM = React.findDOMNode(this.refs._stage),
   stageW = stageDOM.scrollWidth,
   stageH = stageDOM.scrollHeight,
   halfStageW = Math.ceil(stageW / 2),
   halfStageH = Math.ceil(stageH / 2);
   var imgFigureDOM = React.findDOMNode(this.refs.ImgFigure0),
   imgW = imgFigureDOM.scrollWidth,
   imgH = imgFigureDOM.scrollHeight,
   halfImgW = Math.ceil(imgW / 2),
   halfImgH = Math.ceil(imgH / 2);
   this.Constant.centerPos = {
     left: halfStageW - halfImgW,
     top: halfStageH - halfImgH
   };
  this.Constant.hPosRange.leftSecx[0] = -halfImgW;
  this.Constant.hPosRange.leftSecx[1] = halfStageW - halfImgW * 3;
  this.Constant.hPosRange.rightSecx[0] = halfStageW + halfImgW;
  this.Constant.hPosRange.rightSecx[1] = stageW - halfImgW;
  this.Constant.hPosRange.y[0] = -halfImgH;
  this.Constant.hPosRange.y[1] = stageH - halfImgH;
  this.Constant.vPosRange.topY[0] = -halfImgH;
  this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
  this.Constant.vPosRange.x[0] = halfStageW - imgW;
  this.Constant.vPosRange.x[1] = halfStageW;
   this.rearrange(0);
 },
   render: function() {
    //  var controllerUnits = [];
     var ImgFigures = [];
        imageDatas.forEach(function(value, index){
          if(!this.state.imgsArrangeArr[index]){
            this.state.imgsArrangeArr[index] = {
              pos: {
                left: 0,
                top: 0
              },
              rotate: 0,
              isInverse: false,
              isCenter: false
            };
          }
          ImgFigures.push(<ImgFigure data={value} ref={'ImgFigure' + index} arrange={this.state.imgsArrangeArr[index]}
           inverse={this.inverse(index)} center={this.center(index)}/>);
        }.bind(this));
    return (
      <section className = "stage" ref = "_stage">
              <section className = "img-sec">
              {ImgFigures}
              </section>
              <nav className = "controller-nav">
              </nav>
      </section>
    );
  }
});
React.render(<GalleryByReactApp />, document.getElementById('content')); // jshint ignore:line

module.exports = GalleryByReactApp;
