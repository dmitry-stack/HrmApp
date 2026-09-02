import type { Candidate } from '@/entities/canditate/model/types';
import resume from '@/shared/assets/candidates/resume.svg';

interface CandidatesTableProps {
  candidates: Candidate[];
}

export function CandidatesTable({ candidates }: CandidatesTableProps) {
  return (
    <table className="w-full border-collapse border  border-[#F4F4F4]">
      <thead className="bg-[#F1F2F7] text-left text-sm text-black border-b border-[#F4F4F4]">
        <tr>
          <th className="p-3">
            <input type="checkbox" className="h-4 w-4 accent-[#707FDD]" disabled />
          </th>
          <th className="p-3 font-medium">ID</th>
          <th className="p-3 font-medium">Name</th>
          <th className="p-3 font-medium">City</th>
          <th className="p-3 font-medium">Title</th>
          <th className="p-3 font-medium">Resume</th>
          <th className="p-3 font-medium">Owner</th>
          <th className="p-3 font-medium">Source</th>
          <th className="p-3 font-medium">Profile request</th>
          <th className="p-3 font-medium">Profile updated</th>
        </tr>
      </thead>
      <tbody className="text-sm text-[#3E566F]">
        {candidates.map((candidate) => (
          <tr key={candidate.id} className="border-b border-[#F4F4F4]">
            <td className="p-3">
              <input type="checkbox" className="h-4 w-4 accent-[#707FDD]" />
            </td>
            <td className="p-3">{candidate.id}</td>
            <td className="p-3">{candidate.name}</td>
            <td className="p-3">{candidate.city}</td>
            <td className="p-3">{candidate.title}</td>
            <td className="p-3">
              <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer">
                <img src={resume} alt="Resume" className="h-6 w-6" />
              </a>
            </td>
            <td className="p-3">{candidate.owner}</td>
            <td className="p-3">{candidate.source}</td>
            <td className="p-3">{candidate.profileRequest}</td>
            <td className="p-3">{candidate.profileUpdated.toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
