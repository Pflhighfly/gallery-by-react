'use strict';

var React = require('react/addons');
// var ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
require('normalize.css');
require('../styles/main.scss');
//获取图片的相关数据
var imageDatas =require('../data/imageData.json')
// var imageURL = require('../images/yeoman.png');
//利用自执行函数，将图片名信息转成图片URL路径
imageDatas=(function genImageURL(imageDatasArr){
  for(var i=0,j=imageDatasArr.length;i<j;i++){
    var singleImageData =imageDatasArr[i];
    singleImageData.imageURL=require('../images/'+singleImageData.fileName);
      imageDatasArr[i]=singleImageData;
  }
     return imageDatasArr
})(imageDatas);
// imageDatas =genImageURL(imageDatas);

var GalleryByReactApp = React.createClass({
  render: function() {
    return (
      <section className="stage">
              <section className="img-sec">
              </section>
              <nav className="controller-nav">
              </nav>
      </section>
    );
  }
});
React.render(<GalleryByReactApp />, document.getElementById('content')); // jshint ignore:line

module.exports = GalleryByReactApp;
