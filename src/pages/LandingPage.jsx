// Copyright 2022 mitchelleglon
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing-page-container">
      <div className="landing-page-content">
        <h2>Welcome!</h2>
        <div className="landing-page-link">
          <p>Already have an account?</p>
          <div
            className="report-defect-button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </div>
        </div>
        <div className="landing-page-link">
          <p>Maybe you're new here?</p>
          <div
            className="report-defect-button"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign up
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
