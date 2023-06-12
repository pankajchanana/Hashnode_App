import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../../utilities/ContextStore";
import { setUserAddressInfo } from "../../../redux/actions/productsAction";
import { useDispatch } from "react-redux";
import { InputLabel } from "@mui/material";

export default function UserAddress({ userAddress }) {
  const { openAdressModal, setOpenAdressModal, setData, data } =
    useContext(DataContext);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpenAdressModal(false);
  };

  let [userAddressData, setUserAddressData] = useState({
    address: userAddress?.address,
    zip_code: userAddress?.zip_code,
    land_mark: userAddress?.land_mark,
    house_no: userAddress?.house_no,
    mobile_number: userAddress?.mobile_number ? userAddress?.mobile_number.toString() :userAddress?.mobile_number ,
  });

  const handleSubmit = () => {
    dispatch(setUserAddressInfo(userAddressData));
    handleClose();
  };
  return (
    <div>
      <Dialog open={openAdressModal} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center" }}>
          Enter your Address
        </DialogTitle>
        <DialogContent>
          <InputLabel>House Number</InputLabel>
          <TextField
            autoFocus
            margin="dense"
            placeholder="House Number"
            fullWidth
            value={userAddressData?.house_no}
            name="house_no"
            onChange={(e) =>
              setUserAddressData({
                ...userAddressData,
                [e.target.name]: e.target.value,
              })
            }
          />
          <InputLabel>Address</InputLabel>

          <TextField
            margin="dense"
            placeholder="Address"
            fullWidth
            value={userAddressData?.address}
            name="address"
            onChange={(e) =>
              setUserAddressData({
                ...userAddressData,
                [e.target.name]: e.target.value,
              })
            }
          />
          <InputLabel>Mobile Number</InputLabel>

          <TextField
            margin="dense"
            placeholder="Mobile Number"
            fullWidth
            value={userAddressData.mobile_number}
            name="mobile_number"
            onChange={(e) =>
              setUserAddressData({
                ...userAddressData,
                [e.target.name]: e.target.value,
              })
            }
          />
          <InputLabel>Landmark</InputLabel>

          <TextField
            margin="dense"
            placeholder="Landmark"
            fullWidth
            value={userAddressData.land_mark}
            name="land_mark"
            onChange={(e) =>
              setUserAddressData({
                ...userAddressData,
                [e.target.name]: e.target.value,
              })
            }
          />
          <InputLabel>Zip Code</InputLabel>

          <TextField
            margin="dense"
            placeholder="Zip Code"
            fullWidth
            value={userAddressData.zip_code}
            name="zip_code"
            onChange={(e) =>
              setUserAddressData({
                ...userAddressData,
                [e.target.name]: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
