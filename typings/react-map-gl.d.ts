import * as React from "react";

declare namespace ReactMapGL {
    export interface IViewport {
        bearing: number;
        isDragging: boolean;
        latitude: number;
        longitude: number;
        pitch?: number;
        startBearing?: number;
        startDragLngLat?: number[];
        startPitch?: number;
        zoom: number;
    }

    interface IStaticMapProps {
        /** Mapbox API access token for mapbox-gl-js. Required when using Mapbox vector tiles/styles. */
        mapboxApiAccessToken: string;
        /** Mapbox WebGL context creation option. Useful when you want to export the canvas as a PNG. */
        preserveDrawingBuffer?: boolean;
        /** Show attribution control or not. */
        attributionControl?: boolean;

        /** The Mapbox style. A string url or a MapboxGL style Immutable.Map object. */
        mapStyle?: string; // TODO can also be immutable map
        /** There are known issues with style diffing. As stopgap, add option to prevent style diffing. */
        preventStyleDiffing?: boolean;
        /** Whether the map is visible */
        visible?: boolean;

        /** The width of the map. */
        width: number;
        /** The height of the map. */
        height: number;
        /** The longitude of the center of the map. */
        longitude: number;
        /** The latitude of the center of the map. */
        latitude: number;
        /** The tile zoom level of the map. */
        zoom: number;
        /** Specify the bearing of the viewport */
        bearing?: number;
        /** Specify the pitch of the viewport */
        pitch?: number;
        /** Altitude of the viewport camera. Default 1.5 "screen heights" */
        altitude?: number; // Note: Non-public API, see https://github.com/mapbox/mapbox-gl-js/issues/1137

        perspectiveEnabled?: boolean;
    }

    interface IInteractiveMapProps extends IStaticMapProps {
        /** Max zoom level */
        maxZoom?: number;
        /** Min zoom level */
        minZoom?: number;
        /** Max pitch in degrees */
        maxPitch?: number;
        /** Min pitch in degrees */
        minPitch?: number;

        /**
         * `onChangeViewport` callback is fired when the user interacted with the
         * map. The object passed to the callback contains viewport properties
         * such as `longitude`, `latitude`, `zoom` etc.
         */
        onChangeViewport?: (viewport: IViewport) => void;

        /** Scroll to zoom */
        scrollZoom?: boolean;
        /** Drag to pan */
        dragPan?: boolean;
        /** Drag to rotate */
        dragRotate?: boolean;
        /** Double click to zoom */
        doubleClickZoom?: boolean;
        /** Pinch to zoom / rotate */
        touchZoomRotate?: boolean;

        /**
         * Called when the map is hovered over.
         * @callback
         * @param {Object} event - The mouse event.
         * @param {[number, number]} lngLat - The coordinates of the pointer
         * @param {Array} features - The features under the pointer, using Mapbox's
         * queryRenderedFeatures API:
         * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
         * To make a layer interactive, set the `interactive` property in the
         * layer style to `true`. See Mapbox's style spec
         * https://www.mapbox.com/mapbox-gl-style-spec/#layer-interactive
         */
        onHover?: (event: any, lngLat: number[], features: any) => void;

        /**
         * Called when the map is clicked.
         * @callback
         * @param {Object} event - The mouse event.
         * @param {[number, number]} lngLat - The coordinates of the pointer
         * @param {Array} features - The features under the pointer, using Mapbox's
         * queryRenderedFeatures API:
         * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
         * To make a layer interactive, set the `interactive` property in the
         * layer style to `true`. See Mapbox's style spec
         * https://www.mapbox.com/mapbox-gl-style-spec/#layer-interactive
         */
        onClick?: (event: any, lngLat: number[], features: any) => void;

        /** Radius to detect features around a clicked point. Defaults to 0. */
        clickRadius?: number;

        /** Accessor that returns a cursor style to show interactive state */
        getCursor?: () => any;

        /** Advanced features */
        /**
         * Contraints for displaying the map. If not met, then the map is hidden.
         * Experimental! May be changed in minor version updates.
         */
        visibilityConstraints?: {
            minZoom: number;
            maxZoom: number;
            minPitch: number;
            maxPitch: number;
        };

        /**
         * A map control instance to replace the default map controls
         * The object must expose one property: `events` as an array of subscribed
         * event names; and two methods: `setState(state)` and `handle(event)`
         */
        mapControls?: {
            events: string[];
            handleEvent: (e: any) => void;
        };
    }

    export class InteractiveMap extends React.Component<IInteractiveMapProps, {}> {
        public _map: mapboxgl.Map;
    }
}

declare module "react-map-gl" {
    const MapGL = ReactMapGL.InteractiveMap;
    export = MapGL;
}

declare namespace ReactMapGL {
    import * as Immutable from "immutable";

    type ICompositeOperation =
        | "source-over"
        | "source-in"
        | "source-out"
        | "source-atop"
        | "destination-over"
        | "destination-in"
        | "destination-out"
        | "destination-atop"
        | "lighter"
        | "copy"
        | "xor"
        | "multiply"
        | "screen"
        | "overlay"
        | "darken"
        | "lighten"
        | "color-dodge"
        | "color-burn"
        | "hard-light"
        | "soft-light"
        | "difference"
        | "exclusion"
        | "hue"
        | "saturation"
        | "color"
        | "luminosity";

    interface IScatterplotOverlayProps {
        width: number;
        height: number;
        latitude: number;
        longitude: number;
        zoom: number;
        isDragging: boolean;
        locations: Immutable.List<number[]>;
        lngLatAccessor?: (o: any) => number[];
        renderWhileDragging?: boolean;
        globalOpacity?: number;
        dotRadius?: number;
        dotFill?: string;
        compositeOperation?: ICompositeOperation;
    }

    export class ScatterplotOverlay extends React.Component<IScatterplotOverlayProps, {}> { }
}

declare module "react-map-gl/dist/overlays/scatterplot.react" {
    const ScatterplotOverlay = ReactMapGL.ScatterplotOverlay;
    export default ScatterplotOverlay;
}