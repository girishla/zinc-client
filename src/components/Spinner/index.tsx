import * as React from 'react'; // eslint-disable-line import/no-extraneous-dependencies
import cx from '../../utils/classnames';
import allSpinners from './spinners';


interface ISpinnerProps {
  style: any;
  name: string;
  color: string;
  noFadeIn?: boolean;
  fadeIn?: string;
  overrideSpinnerClassName?: string;
  className?: string;

}

if (!process.env.REACT_SPINKIT_NO_STYLES) {
  // tslint:disable-next-line no-var-requires
  require('./base.css');
  // tslint:disable-next-line no-var-requires
  require('./three-bounce.css');

}

const noFadeInWarning =
  "Deprecation Warning (react-spinkit): noFadeIn prop should be replaced with fadeIn='none'";

class Spinner extends React.Component<ISpinnerProps> {


  public static defaultProps = {
    fadeIn: 'full',
    name: 'three-bounce',
    noFadeIn: false,
    overrideSpinnerClassName: ''
  };
  public displayName: string;

  constructor(props: ISpinnerProps) {
    if (props.noFadeIn) {
      // tslint:disable-next-line no-console
      console.warn(noFadeInWarning);
    }
    super(props);
    this.displayName = 'SpinKit';
  }

  public render() {
    const spinnerInfo = allSpinners[this.props.name] || allSpinners['three-bounce'];
    const classes = cx({
      'sk-fade-in': this.props.fadeIn === 'full' && !this.props.noFadeIn,
      'sk-fade-in-half-second': this.props.fadeIn === 'half' && !this.props.noFadeIn,
      'sk-fade-in-quarter-second': this.props.fadeIn === 'quarter' && !this.props.noFadeIn,
      'sk-spinner': !this.props.overrideSpinnerClassName,
      [(this.props.overrideSpinnerClassName as any)]: !!this.props.overrideSpinnerClassName,
      [(this.props.className as any)]: !!this.props.className,
      [spinnerInfo.className || this.props.name]: true
    });

    const props: any = Object.assign({}, this.props);
    delete props.name;
    delete props.fadeIn;
    delete props.noFadeIn;
    delete props.overrideSpinnerClassName;
    delete props.className;

    if (this.props.color) {
      props.style = props.style
        ? { ...props.style, color: this.props.color }
        : { color: this.props.color };
    }

    return (
      <div {...props} className={classes}>
        {[...Array(spinnerInfo.divCount)].map((_, idx) => <div key={idx} />)}
      </div>
    );
  }
}


export default Spinner;
