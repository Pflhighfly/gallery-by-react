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
var ImgFigure = React.createClass({
  render: function() {
     return (
       <figure className = "img-figure">
       <img src = {this.props.data.imageURL}
            alt = {this.props.data.title}
          />
       <figcaption>
       <h2 className="img-title">{this.props.data.title}</h2>
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
   //组件加载以后，为每张图片计算其位置
componentDidMount: function (){
   var stageDOM = React.findDOMNode(this.refs._stage),
   stageW = stageDOM.scrollWidth,
   stageH = stageDOM.scrollHeight,
   halfStageW = Math.cell(stageW / 2),
   halfStageH = Math.cell(stageH / 2);
   var imgFigureDOM = React.findDOMNode(this.refs.ImgFigure0),
   imgW = imgFigureDOM.scrollWidth,
   imgH = imgFigureDOM.scrollHeight,
   halfImgW = Math.cell(imgW / 2),
   halfImgH = Math.cell(imgH / 2);
   this.Constant.centerPos={
     left: halfStageW-halfImgW,
     top: halfStageH-halfImgH
   }
 },
   render: function() {
    //  var controllerUnits = [];
     var ImgFigures = [];
        imageDatas.forEach(function(value){
          ImgFigures.push(<ImgFigure data={value} ref={'ImgFigure' + index}/>);
        });
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
