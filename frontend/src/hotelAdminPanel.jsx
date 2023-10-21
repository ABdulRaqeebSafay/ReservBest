import Calendar from "./calendar"

const HotelAdminPanel = () => {
    return (
        <>
            <Calendar />
            <table className="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Customer Id</th>
      <th scope="col">Customer Name</th>
      <th scope="col">Phone Number</th>
      <th scope="col">Selected Menu</th>
      <th scope="col">Amount of Guests</th>
      <th scope="col">Status</th>
      <th scope="col">Date of Event</th>
      <th scope="col">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
  
  </tbody>
</table>
        </>
    )
}

export default HotelAdminPanel;