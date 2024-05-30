<template>
    <div id="map" class="map-container"></div>
</template>

<script>
import { onMounted, watch } from 'vue';
import tt from '@tomtom-international/web-sdk-maps';

export default {
    name: 'Map',
    props: {
        apiKey: String,
        lat: Number,
        long: Number,
        apartments: Array,
    },
    setup(props) {
        let map = null;
        let markers = [];

        const initializeMap = () => {
            map = tt.map({
                key: props.apiKey,
                container: 'map',
                center: [props.long, props.lat],
                zoom: 11
            });

            new tt.Marker().setLngLat([props.long, props.lat]).addTo(map);
            map.addControl(new tt.NavigationControl());
        };

        const updateMapCenter = () => {
            if (map) {
                map.setCenter([props.long, props.lat]);
                // Clear existing center marker if any
                markers = markers.filter(marker => {
                    if (marker.getLngLat().lat === props.lat && marker.getLngLat().lng === props.long) {
                        marker.remove();
                        return false;
                    }
                    return true;
                });
                // Add new center marker
                const centerMarker = new tt.Marker().setLngLat([props.long, props.lat]).addTo(map);
                markers.push(centerMarker);
            }
        };

        const updateMarkers = () => {
            // Remove all existing markers
            markers.forEach(marker => marker.remove());
            markers = [];

            // Add markers for the apartments
            props.apartments.forEach(apartment => {
                const marker = new tt.Marker().setLngLat([apartment.longitude, apartment.latitude]).addTo(map);
                markers.push(marker);
            });

            // Add the center marker again
            const centerMarker = new tt.Marker().setLngLat([props.long, props.lat]).addTo(map);
            markers.push(centerMarker);
        };

        const resizeMap = () => {
            if (map) {
                map.resize();
                map.setCenter([props.long, props.lat]);
            }
        };

        onMounted(() => {
            initializeMap();
        });

        watch(() => [props.lat, props.long], () => {
            updateMapCenter();
        });

        watch(() => props.apartments, () => {
            updateMarkers();
        });

        return { map, resizeMap };
    }
};
</script>

<style scoped>
.map-container {
    width: 100% !important;
    height: 300px;
    margin: 0 auto;
}

@media screen and (min-width: 1024px) {
    .map-container {
        width: 100% !important;
        height: 300px;
    }
}
</style>
