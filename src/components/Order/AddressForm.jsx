import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as turf from '@turf/turf'; // Библиотека для работы с геоданными
import L from 'leaflet';

// GeoJSON данные для зон
export const zones = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            properties: { delivery: "free" },
            geometry: {
                type: "Polygon",
                "coordinates": [
                    [
                        [
                            23.895355113699623,
                            53.723432001835846
                        ],
                        [
                            23.89017448450963,
                            53.72715048198074
                        ],
                        [
                            23.884980262977706,
                            53.724142575244116
                        ],
                        [
                            23.876064094416904,
                            53.727545555498835
                        ],
                        [
                            23.871904147131744,
                            53.7249245741547
                        ],
                        [
                            23.866670123007196,
                            53.72357524343511
                        ],
                        [
                            23.86331654374544,
                            53.7219873215995
                        ],
                        [
                            23.862116541421727,
                            53.72032093095069
                        ],
                        [
                            23.860638008209264,
                            53.72016180213936
                        ],
                        [
                            23.85109793150687,
                            53.72922767183894
                        ],
                        [
                            23.84800504110777,
                            53.72898749890939
                        ],
                        [
                            23.84316077722019,
                            53.72190597735744
                        ],
                        [
                            23.832014527617048,
                            53.725254931185475
                        ],
                        [
                            23.813862741186455,
                            53.72271609792651
                        ],
                        [
                            23.7996072149611,
                            53.72048853402691
                        ],
                        [
                            23.79355668475509,
                            53.716668373848364
                        ],
                        [
                            23.784145719502646,
                            53.713325531470076
                        ],
                        [
                            23.78076064521224,
                            53.70703757340942
                        ],
                        [
                            23.782086625731324,
                            53.69922866747032
                        ],
                        [
                            23.78828690363642,
                            53.69787633270536
                        ],
                        [
                            23.787879088468543,
                            53.68847211099029
                        ],
                        [
                            23.799878115097044,
                            53.69000105140543
                        ],
                        [
                            23.79758597559794,
                            53.68378433832902
                        ],
                        [
                            23.806432363965087,
                            53.67959675205748
                        ],
                        [
                            23.81284626162875,
                            53.67886077933241
                        ],
                        [
                            23.82695166261783,
                            53.672383309208044
                        ],
                        [
                            23.83610777424704,
                            53.670055123529096
                        ],
                        [
                            23.859677350968354,
                            53.661889531571546
                        ],
                        [
                            23.860635329699875,
                            53.670644773592045
                        ],
                        [
                            23.888573136672335,
                            53.67172276991684
                        ],
                        [
                            23.895355113699623,
                            53.723432001835846
                        ]
                    ]
                ],
            }
        },
        {
            type: "Feature",
            properties: { delivery: "paid" },
            geometry: {
                type: "Polygon",
                "coordinates": [
                    [
                        [
                            23.79731688491816,
                            53.6837923518834
                        ],
                        [
                            23.773069156789774,
                            53.678701286901486
                        ],
                        [
                            23.764301876020994,
                            53.67697636508336
                        ],
                        [
                            23.73175506145492,
                            53.68215013039975
                        ],
                        [
                            23.741609024531073,
                            53.68731666874632
                        ],
                        [
                            23.738582249930232,
                            53.693075186651384
                        ],
                        [
                            23.71995297925207,
                            53.69374013095103
                        ],
                        [
                            23.712523560907897,
                            53.685624575382974
                        ],
                        [
                            23.695551186230404,
                            53.682659518125405
                        ],
                        [
                            23.70165171167841,
                            53.66080998876447
                        ],
                        [
                            23.72578293330338,
                            53.635916638108114
                        ],
                        [
                            23.76121172620256,
                            53.65117496955105
                        ],
                        [
                            23.760980608575807,
                            53.64745073154964
                        ],
                        [
                            23.764207584074086,
                            53.643727392534515
                        ],
                        [
                            23.768878741595046,
                            53.64218567443146
                        ],
                        [
                            23.784805777728508,
                            53.64025379939383
                        ],
                        [
                            23.807363254174817,
                            53.6346217771989
                        ],
                        [
                            23.797493270024518,
                            53.61927193724304
                        ],
                        [
                            23.78265709573327,
                            53.62354099507061
                        ],
                        [
                            23.771017952090915,
                            53.623565303143266
                        ],
                        [
                            23.767615779461806,
                            53.61532088681639
                        ],
                        [
                            23.82056251410711,
                            53.606395936788346
                        ],
                        [
                            23.84324912835487,
                            53.6010267616922
                        ],
                        [
                            23.854762847437456,
                            53.607052756586285
                        ],
                        [
                            23.869877845574564,
                            53.60522510368017
                        ],
                        [
                            23.872125169758675,
                            53.61875513639421
                        ],
                        [
                            23.883426998925472,
                            53.63256385855385
                        ],
                        [
                            23.886255435134103,
                            53.65309179211724
                        ],
                        [
                            23.888763770917933,
                            53.67133790168347
                        ],
                        [
                            23.860999934305227,
                            53.67051504653634
                        ],
                        [
                            23.85968007448116,
                            53.66132864891833
                        ],
                        [
                            23.827033677003243,
                            53.67251602542831
                        ],
                        [
                            23.79731688491816,
                            53.6837923518834
                        ]
                    ]
                ],
            }
        }
    ]
};

const AddressForm = ({ onZoneChange }) => {
    const { register, handleSubmit, formState: { errors }, trigger } = useForm();
    const [loading, setLoading] = useState(false);

    const geocodeAddress = async (address) => {
        const apiKey = 'dc08b2d5-30bf-4808-87ea-1a69e9affa60';
        const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${address}&format=json`;

        const response = await axios.get(url);
        const point = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
        const [longitude, latitude] = point.split(' ').map(coord => parseFloat(coord));

        return { latitude, longitude };
    };

    const checkZone = (latitude, longitude) => {
        const point = turf.point([longitude, latitude]);

        for (const feature of zones.features) {
            const polygon = turf.polygon(feature.geometry.coordinates);
            if (turf.booleanPointInPolygon(point, polygon)) {
                return feature.properties.delivery;
            }
        }
        return null;
    };

    const onChange = async (e) => {
        const address = e.target.value;
        if (address) {
            setLoading(true);
            try {
                const coords = await geocodeAddress(address);
                const zone = checkZone(coords.latitude, coords.longitude);
                onZoneChange(zone);
            } catch (error) {
                console.error('Error:', error);
                onZoneChange(null);
            }
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-full">
            <input
                type="text"
                name="address"
                id="address"
                {...register('address', { required: true })}
                placeholder="Улица, номер дома, номер квартиры"
                className={`w-full border p-3 border-gray-200 rounded outline-none ${errors.address ? 'border-red-500' : ''}`}
                onBlur={() => trigger("address")}
                onChange={onChange}
            />
            {errors.address && <span className="text-red-500 mt-2 mb-2 text-sm">Введите адрес</span>}

            {loading && <p>Проверка...</p>}
        </div>
    );
};

export default AddressForm;