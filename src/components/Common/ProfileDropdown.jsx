import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { avatar1 } from "../../assets";
import { useQuery } from "@tanstack/react-query";
import { getWalletAnalytics } from "../../services/user/wallet";
import { formatCurrency, getAccessToken } from "../../constants";
import { getUserInfo } from "../../services/user/user";
import { capitalize } from "lodash";

const ProfileDropdown = () => {
  const token = getAccessToken();

  const { data: walletAnalytics } = useQuery({
    queryKey: ["walletAnalytics"],
    queryFn: getWalletAnalytics,
    enabled: !!token,
  });
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
    enabled: !!token,
  });
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };
  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className="ms-sm-3 header-item topbar-user"
      >
        <DropdownToggle tag="button" type="button" className="btn">
          <span className="d-flex align-items-center">
            <img
              className="rounded-circle header-profile-user"
              src={avatar1}
              alt="Header Avatar"
            />
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                {capitalize(user?.personalInfo?.username)}
              </span>
              <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                Member
              </span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <h6 className="dropdown-header">Welcome</h6>
          <DropdownItem href="/profile">
            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
            <span className="align-middle">Profile</span>
          </DropdownItem>

          <DropdownItem href="/history">
            <i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i>
            <span className="align-middle">History</span>
          </DropdownItem>

          <div className="dropdown-divider"></div>

          <DropdownItem href="/logout">
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle" data-key="t-logout">
              Logout
            </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;
