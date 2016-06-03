<?php
  	// http://stackoverflow.com/questions/18382740/cors-not-working-php
  	if (isset($_SERVER['HTTP_ORIGIN'])) {
          header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
          header('Access-Control-Allow-Credentials: true');
          header('Access-Control-Max-Age: 86400');    // cache for 1 day
      }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }

    //http://stackoverflow.com/questions/15485354/angular-http-post-to-php-and-undefined
    $postdata = file_get_contents("php://input");

    // if (isset($postdata)) {
      $link = mysqli_connect("13.76.90.160", "sepeda", "kampus", "sepeda") or die("Could not connect.");
  		$request = json_decode($postdata);
  		$nim = $request->nim;
      $token = $request->token;


      // check for post data
      // if (isset($nim)) {

          // get a product from products table
          $result = mysqli_query($link, "SELECT mahasiswaNim, mahasiswaNama, mahasiswaStatus, mahasiswaDenda FROM mahasiswa WHERE mahasiswaNim = '$nim'") or die("Error in Selecting " . mysqli_error($connection));

          //create an array
          $emparray = array();
          while($row =mysqli_fetch_assoc($result))
          {
              $emparray[] = $row;
          }
          echo json_encode($emparray);
          //$res1 =  escapeJsonString($res);
          //echo $res;

          echo "aaa";

          //close the db connection
          mysqli_close($connection);
      // }
    // }
?>
