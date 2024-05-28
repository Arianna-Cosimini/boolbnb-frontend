<!-- <script>
import { onMounted } from 'vue';
import tt from '@tomtom-international/web-sdk-maps';

export default {
    name: 'Map',
    props: {
        apiKey: String,
        lat: String,
        long: String
    },
    setup(props) {
        let map = null;

        onMounted(() => {
            // Convert lat and long to numbers and check if they are valid
            const latitude = parseFloat(props.lat);
            const longitude = parseFloat(props.long);

            if (isNaN(latitude) || isNaN(longitude)) {
                console.error('Invalid latitude or longitude');
                return;
            }

            map = tt.map({
                key: props.apiKey,
                container: 'map',
                center: [longitude, latitude],
                zoom: 11
            });

            const marker = new tt.Marker().setLngLat([longitude, latitude]).addTo(map);
            map.addControl(new tt.NavigationControl());
        });

        return { map };
    }
}

</script>

<template>
    <div id="map" class="map-container"></div>
</template>

<style scoped>
.map-container {
    height: 200px;
    width: 100%;
}
</style> -->

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
        let markers = []

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

                let marker = new tt.Marker().setLngLat([props.long, props.lat]).addTo(map);
            }
        };

        const updateMarkers = () => {
            // Rimuovi tutti i marcatori esistenti
            markers.forEach(marker => marker.remove());
            markers = [];

            // Aggiungi i marcatori per gli appartamenti
            props.apartments.forEach(apartment => {
                // const marker = new tt.Marker().setLngLat([apartment.longitude, apartment.latitude]).addTo(map);
                markers.push(marker);
            });
        };


        onMounted(() => {
            initializeMap();
        });

        watch(() => [props.lat, props.long], () => {
            updateMapCenter();
        });

        watch(() => props.apartments, () => {
            // Rimuovi tutti i marcatori esistenti
            map.getSource().clear();

            // Aggiungi i marcatori per tutti gli appartamenti
            props.apartments.forEach(apartment => {
                new tt.Marker().setLngLat([apartment.longitude, apartment.latitude]).addTo(map);
                markers.push(marker);
            });
        });

        watch(() => props.apartments, () => {
            updateMarkers();
        });

        return { map };
    }
};
</script>

<style scoped>
.map-container {
    width: 100%;
    height: 300px;
    margin: 0 auto;
}

@media screen and (min-width: 1024px) {

    .map-container {
        width: 60%;
        margin: 0 auto;
        height: 300px;
    }
}
</style>
