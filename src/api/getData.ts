import { ChartData } from "./models";

export const getData: () => Promise<ChartData[]> = () => new Promise((resolve, reject) => {
    fetch('/test-data.json')
        .then((response) => {
            if (response.ok) {
               resolve(response.json());
            } else {
                reject(response.status);
            }
        })
});