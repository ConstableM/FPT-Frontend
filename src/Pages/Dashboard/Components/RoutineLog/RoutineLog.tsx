import React from 'react';
import { Routine } from '../../../../Interfaces/Routine';
import './RoutineLog.css';
import RoutineDetailComponent from '../../../Routines/RoutineDetail';

interface RoutineLogProps {
    completedRoutines: Routine[];
    currentMonth: number;
    currentYear: number;
    selectedDate: string | null;
    selectedId: string | null;
    clearFilters: () => void;
}

const RoutineLog: React.FC<RoutineLogProps> = ({ completedRoutines, currentMonth, currentYear, selectedDate, selectedId, clearFilters }) => {
    const filteredRoutines = completedRoutines.filter(routine => {
        if (selectedDate && selectedId) {
            return routine.routineLogId.toString() === selectedId;
        }

        if (selectedDate && !selectedId) {
            return routine.date === selectedDate;
        }

        if (!selectedDate && !selectedId) {
            const routineDate = new Date(routine.date);
            const routineMonth = routineDate.getMonth() + 1;
            const routineYear = routineDate.getFullYear();
            return routineMonth === currentMonth && routineYear === currentYear;
        }

        return false; // Ensure a boolean is returned for all paths
    });

    const renderNoRoutinesMessage = () => {
        if (selectedDate) {
            return <p className="routine-entry no-routines">No routines completed on this day.</p>;
        }
        return <p className="routine-entry no-routines">No routines completed in this month.</p>;
    };

    // Determine if the clear filters button should be disabled
    const isClearFiltersDisabled = !selectedDate && !selectedId;

    return (
        <div className="routine-log-container">
            <div className="routine-log-box">
                <div className="btn-container">
                    <button onClick={clearFilters} className="clear-filters-btn" disabled={isClearFiltersDisabled}>Clear Filters</button> {}
                </div>
                
                {filteredRoutines.length > 0 ? (
                    filteredRoutines.map((routine) => (
                        // add data attribute to the div
                        <RoutineDetailComponent routineId={routine.routineId} popoverTrigger={
                            <div key={routine.routineLogId} className="routine-entry" data-routine-id={routine.routineId}>
                                <div className="name-date-container">
                                    <p className="name">{routine.name}</p>
                                    <p className="date">{new Date(routine.date + 'T00:00:00').toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="description">{routine.description}</p>
                                </div>
                            </div>
                        }/>
                    ))
                ) : (
                    renderNoRoutinesMessage()
                )}
            </div>
        </div>
    );
};

export default RoutineLog;
