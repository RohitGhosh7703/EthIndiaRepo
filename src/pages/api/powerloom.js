import axios from "axios";



export default async function handler(req, res) {
    const project_id =  `aggregate_24h_stats_lite:9fb408548a732c85604dacb9c956ffc2538a3b895250741593da630d994b1f27:UNISWAPV2`|| req.query.project_id;
    const epoch_id = `237`||req.query.epoch_id;

    try {
        const referer = req.headers.referer || req.headers.referrer; // get the referer from the request headers
    
        if (req.method !== 'GET') {
          return res.status(405).json({ message: 'Method should be GET' });
        }
    
        if (process.env.NODE_ENV !== 'development') {
          if (!referer || referer !== process.env.APP_URL) {
            return res.status(401).json({ message: 'Unauthorized' });
          }
        }
    
        const { body } = req;
        const url = `https://uniswapv2-api.powerloom.io/data/${epoch_id}/${project_id}/`;
        const headers = {
          'Content-type': 'application/json',
          Authorization: `Bearer 6266683f-1911-4057-a27a-ac693a4682ff`,
        };
    
        const response = await axios.get(url, body, { headers: headers });
    
        res.status(200).json(response.data);
      } catch (error) {
        console.error('API Error:', error.message, error.response?.data);
    
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          res.status(error.response.status).json(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          res.status(500).json({ message: 'No response received from the server' });
        } else {
          // Something happened in setting up the request that triggered an Error
          res.status(500).json({ message: 'Request setup error' });
        }
      }

};