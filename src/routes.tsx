import { useState, useEffect, ReactNode, createElement } from "react";
import { Redirect, Route, Switch, useRoute, useLocation } from "wouter";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { Profile } from "@/pages/Profile";
import { NotFound } from "@/pages/NotFound";
import { HeaderLayout } from "@/components/layouts/HeaderLayout";

// TODO
// LoginRedirect.tsx
// RestrictAccess.tsx

export const routes = () => (
  <HeaderLayout>
    <Switch>
      <Route path="/">
        <Redirect to={"home"} />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Profile />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </HeaderLayout>
);
