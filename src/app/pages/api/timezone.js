const apikey = 'a4aa95c76cc64611a49a3b792fad417d';
const apiEndpoint = `https://time.abstractapi.com/v1/current`;

export default async function handler(req, res) {
  const location = req.query.location;

  try {
    const response = await fetch(`${apiEndpoint}?api_key=${apikey}&location="london"`);
    const data = await response.json();
    console.log(data)

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}