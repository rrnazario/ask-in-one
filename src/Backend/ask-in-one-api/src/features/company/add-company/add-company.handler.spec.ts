import { Repository } from "typeorm";
import { AddCompanyCommandHandler } from "./add-company.handler";
import { AddCompanyCommand } from "./add-company.model";
import { Company } from "../../../entities/company.entity";
import { ModuleMocker } from 'jest-mock';
import { Test } from "@nestjs/testing";
import { createMapper } from "@automapper/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { getMapperToken } from "@automapper/nestjs";
import { classes } from "@automapper/classes";
import { CompanyProfile } from "../company.profile";

const moduleMocker = new ModuleMocker(global);
const companyId = 12345;

type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
};

const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    findOneBy: jest.fn(entity => entity),
    save: jest.fn(entity => entity),
}));

describe('Companies', () => {
    let handler: AddCompanyCommandHandler;
    let repo: MockType<Repository<Company>>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                CompanyProfile,
                AddCompanyCommandHandler,
                {
                    provide: getRepositoryToken(Company),
                    useFactory: repositoryMockFactory
                },
                {
                    provide: getMapperToken(),
                    useValue: createMapper({
                        strategyInitializer: classes(),
                    }),
                }
            ]
        })
            .compile();

        handler = moduleRef.get(AddCompanyCommandHandler);
        repo = moduleRef.get(getRepositoryToken(Company));
    });

    describe('addCompany', () => {
        it('should return the newly created company id', async () => {
            const company = new Company()
                    .UpdateId(companyId);

            const result = { id: companyId }

            jest.spyOn(repo, 'findOneBy').mockImplementation(async () => null);
            jest.spyOn(repo, 'save').mockImplementation(async () => company);

            const executed = await handler.execute(new AddCompanyCommand('sample name', 'sample login'));
            expect(executed).toStrictEqual(result);
        });
    });
});