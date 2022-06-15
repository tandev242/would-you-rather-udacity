import React from "react";
import { Route, Navigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { useAppSelector } from '../app/hooks';

export default function PrivateRoute({ element }: any) {
    const { isAuthed } = useAppSelector((state: RootState) => state.auth);
    const RouteComponent = () => (
        isAuthed
            ? element
            : <Navigate to="/" />
    );
    return <RouteComponent />;
};