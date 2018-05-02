import * as React from 'react'


class Logo extends React.PureComponent<{ colour: string, width: string, height: string }> {

    public render() {

        return <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width={this.props.width} height={this.props.height} viewBox="50 0 600.000000 389.000000"
            preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,389.000000) scale(0.100000,-0.100000)"
                fill={this.props.colour} stroke="none">
                <path d="M0 3010 l0 -880 895 0 895 0 0 880 0 880 -895 0 -895 0 0 -880z" />
                <path d="M2090 3010 l0 -880 915 0 915 0 0 880 0 880 -915 0 -915 0 0 -880z" />
                <path d="M2090 910 l0 -910 915 0 915 0 0 910 0 910 -915 0 -915 0 0 -910z" />
                <path d="M4220 910 l0 -910 890 0 890 0 0 910 0 910 -890 0 -890 0 0 -910z" />
            </g>
        </svg>


    }


}

export default Logo;