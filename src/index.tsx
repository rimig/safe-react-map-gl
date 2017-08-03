import * as React from "react";
import * as MapGL from "react-map-gl";

class SafeMapGl extends React.Component<any, any> {
    public render() {
        return (
            <iframe src="sandbox.html" sandbox="allow-scripts">
                <MapGL {...this.props} />
            </iframe>
        );
    }
}