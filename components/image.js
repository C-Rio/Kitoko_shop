import React from 'react';

export default class Image extends React.Component {
  render() {
    const imageStyle = {
      width: this.props.width,
      height: this.props.height,
      backgroundImage: `url("${this.props.url}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }

    const content = {
      position: 'absolute',
      top: '50%',
      transform: 'translate(0%, -50%)',
      left: 100,
      color: this.props.color ? this.props.color : 'white',
      fontFamily: 'Raleway',
      maxWidth: 600
    };

    return (
      <div style={imageStyle}>
        <div style={content}>
          <p style={{fontSize: 50, fontWeight: 'bold'}}>{this.props.titre}</p>
          <p style={{marginTop: -40, fontSize: 30}}>{this.props.children}</p>
        </div>
      </div>
    );
  }
}
