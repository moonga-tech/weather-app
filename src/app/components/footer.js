export default function Footer() {
    return (
        <>
            <footer>
                <section>
                    <div className="school-link">
                        <h1 className="text-yellow-400 text-4xl font-bold">School Research and Faculty</h1>
                        <ul className="font-bold">
                            <li><a href="http://www.icuzambia.net" target="_blank">ICU Zambia</a></li>
                            <li><a href="https://www.zrdc.org" target="_blank">ZRDC</a></li>
                        </ul>
                    </div>
                    <div className='copyright'>
                        <span>
                            <p className="ward">Ward: Kariba Ward</p>
                            <br />
                            <p>All Rights Reserved. Designed and Maintained by Alex Sitwala, SIN: 2304259224</p>
                        </span>
                    </div>
                </section>
            </footer>
        </>
    )
}